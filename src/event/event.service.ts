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
import { PhotographerEvent } from '../photographer/entities/photographerxevent.entity';
import { Photography } from './entities/image.entity';
import { PhotographyDto } from './dto/photography.dto';
import { AwsRekognitionService } from '../aws-rekognition/aws-rekognition.service';
@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,

    @InjectRepository(PhotographerEvent)
    private readonly photographerxEventRepository: Repository<PhotographerEvent>,

    @InjectRepository(Photography)
    private readonly photographyRepository: Repository<Photography>,

    private organizerService: OrganizerService,
    
    private mailService: MailService,

    private awsRekognitionService: AwsRekognitionService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const { organizerId, people, ...eventData } = createEventDto;
  
    const organizer = await this.organizerService.findOne(organizerId);
  
    const event = this.eventRepository.create({
      ...eventData, 
      organizer: organizer, 
    });

    await this.eventRepository.save(event);

    await this.sendInvitationToPeople(people, event);
    
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
        organizer: { id: organizer.id },  // Asumiendo que `id` es la clave primaria de Organizer
      },
    });
    console.log('Events:', events);
  
    return events;
  }

  async findAll() {
    return await this.eventRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }

  private async sendInvitationToPeople(people: People[], event : Events){
    people.map((person) => {
      this.mailService.sendInvitation(person.email, person.cant, event);
    })
  }

  async getPhotographersForEvent(eventId: number): Promise<any[]> {
    const photographers = await this.photographerxEventRepository.find({
      where: {
        event: { id: eventId },
      },
      relations: ['photographer'],
    });

    const onlyPhotographers = photographers.map((photographer) => {
      return photographer.photographer
    });

    return onlyPhotographers;
  }

  async uploadImage(photographyDto: PhotographyDto,  image: Express.Multer.File) {
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
    const resultUsers = await this.awsRekognitionService.getUsersByPhotography(image.buffer);

    const url = await this.awsRekognitionService.uploadPhotography(image.buffer, '1234');

    const photography = this.photographyRepository.create({
      ...data,
      photographerxEvent
    });

    // photographerxEvent.photographies = image.filename;

    return await this.photographyRepository.save(photography);
  }



  
  

}
