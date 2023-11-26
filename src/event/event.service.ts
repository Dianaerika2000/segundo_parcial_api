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
@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
    private organizerService: OrganizerService,
    private mailService: MailService,
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
        organizer: organizer,
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
}
