import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizerService } from '../organizer/organizer.service';
import { Events } from './entities/event.entity';
import { MailService } from 'src/mail/mail.service';
import { People } from './interfaces/people.interface';
import { DataEvent } from './interfaces/event.interface';
import { PhotographerEvent } from 'src/photographer/entities/photographerEvent.entity';
import { Photography } from './entities/image.entity';
import { PhotographyDto } from './dto/photography.dto';
import { AwsRekognitionService } from '../aws-rekognition/aws-rekognition.service';
import { Invitation } from './entities/invitation.entity';
import { PhotographerService } from 'src/photographer/photographer.service';
@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,

    @InjectRepository(PhotographerEvent)
    private readonly photographerxEventRepository: Repository<PhotographerEvent>,

    @InjectRepository(Photography)
    private readonly photographyRepository: Repository<Photography>,

    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,

    private organizerService: OrganizerService,

    private mailService: MailService,

    private awsRekognitionService: AwsRekognitionService,

    private phothographerService: PhotographerService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const { organizerId, people, photographerEmail, ...eventData } =
      createEventDto;

    const organizer = await this.organizerService.findOne(organizerId);

    const photographer =
      await this.phothographerService.findOneByEmail(photographerEmail);

    const event = this.eventRepository.create({
      ...eventData,
      organizer: organizer,
    });

    await this.eventRepository.save(event);

    await this.sendInvitationToPeople(people, event);

    await this.mailService.sendInvitationPhotographer(
      photographerEmail,
      2,
      event,
    );

    const invitation = this.invitationRepository.create({
      organizer_id: organizerId,
      photographer_id: photographer.id,
      event_id: event.id,
    });

    await this.invitationRepository.save(invitation);

    return {
      message: 'Event created successfully',
      ...event,
      organizer: organizer,
    };
  }

  async getEventsForOrganizer(organizerId: number): Promise<Events[]> {
    const organizer = await this.organizerService.findOne(organizerId);
    console.log('Organizer:', organizer);

    const events = await this.eventRepository.find({
      where: {
        organizer: { id: organizer.id }, // Asumiendo que `id` es la clave primaria de Organizer
      },
    });
    console.log('Events:', events);

    return events;
  }

  async findAll() {
    return await this.eventRepository.find();
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOneBy({ id: id });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }

  private async sendInvitationToPeople(people: People[], event: Events) {
    people.map((person) => {
      this.mailService.sendInvitation(person.email, person.cant, event);
    });
  }

  async getPhotographersForEvent(eventId: number): Promise<any[]> {
    const photographers = await this.photographerxEventRepository.find({
      where: {
        event: { id: eventId },
      },
      relations: ['photographer'],
    });

    const onlyPhotographers = photographers.map((photographer) => {
      return photographer.photographer;
    });

    return onlyPhotographers;
  }

  async uploadImage(
    photographyDto: PhotographyDto,
    image: Express.Multer.File,
  ) {
    const { eventId, photographerId, ...data } = photographyDto;

    const photographerxEvent = await this.photographerxEventRepository.findOne({
      where: {
        event: { id: eventId },
        photographer: { id: photographerId },
      },
    });

    if (!photographerxEvent) {
      throw new NotFoundException('Photographer not found');
    }

    //comparar la fotografia con los rostros almacenados en la collecion
    const resultUsers = await this.awsRekognitionService.getUsersByPhotography(
      image.buffer,
    );

    const url = await this.awsRekognitionService.uploadPhotography(
      image.buffer,
      '1234',
    );

    const photography = this.photographyRepository.create({
      ...data,
      photographerEvent: photographerxEvent,
    });

    // photographerxEvent.photographies = image.filename;

    return await this.photographyRepository.save(photography);
  }

  async getPhotographerInvitations(photographerId: number) {
    const invitations = await this.invitationRepository
      .createQueryBuilder('invitation')
      .where('invitation.photographer_id = :photographerId', { photographerId })
      .getMany();

    const events = await Promise.all(
      invitations.map(async (invitation) => {
        const event = await this.findOne(invitation.event_id);

        // Extraer solo la información necesaria del evento (nombre y organizador)
        return {
          eventId: event.id,
          eventName: event.name,
          date: event.date,
          time: event.time,
          organizer: event.organizer?.name,
          phtographerId: photographerId,
        };
      }),
    );
    return events;
  }
}
