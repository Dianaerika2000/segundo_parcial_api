import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { UpdatePhotographerDto } from './dto/update-photographer.dto';
import { Photographer } from './entities/photographer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolService } from 'src/rol/rol.service';
import { PhotographerEvent } from './entities/photographerEvent.entity';

@Injectable()
export class PhotographerService {
  constructor(
    @InjectRepository(Photographer)
    private readonly photographerRepository: Repository<Photographer>,

    @InjectRepository(PhotographerEvent)
    private readonly photographerxEventRepository: Repository<PhotographerEvent>,

    private readonly rolService: RolService,
  ) {}

  async create(createPhotographerDto: CreatePhotographerDto) {
    const { rolId } = createPhotographerDto;
    const rol = await this.rolService.findOne(rolId);

    const photographer = this.photographerRepository.create({
      ...createPhotographerDto,
      rol: rol,
    });

    return await this.photographerRepository.save(photographer);
  }

  async findAll() {
    return await this.photographerRepository.find();
  }

  async findOne(id: number) {
    const photographer = await this.photographerRepository.findOneBy({ id });
    if (!photographer) {
      throw new NotFoundException(`Photographer with ID ${id} not found`);
    }
    return photographer;
  }

  async findOneByEmail(email: string) {
    const photographer = await this.photographerRepository.findOneBy({ email });
    if (!photographer) {
      throw new NotFoundException(`Photographer with email ${email} not found`);
    }
    return photographer;
  }

  update(id: number, updatePhotographerDto: UpdatePhotographerDto) {
    return `This action updates a #${id} photographer`;
  }

  remove(id: number) {
    return `This action removes a #${id} photographer`;
  }

  async acceptInvitation(photographerId: number, eventId: number) {
    const photographerxEvent = this.photographerxEventRepository.create({
      date: new Date(),
      state: true,
      photographer: { id: photographerId },
      event: { id: eventId },
    });

    return await this.photographerxEventRepository.save(photographerxEvent);
  }

  async getEventsForPhotographer(photographerId: number): Promise<PhotographerEvent[]> {
    const events = await this.photographerxEventRepository.find({
      where: {
        photographer: { id: photographerId },
      },
      relations: ['event'],
    });
  
    return events;
  }

  async rejectInvitation(photographerId: number, eventId: number) {
    const photographerxEvent = this.photographerxEventRepository.create({
      date: new Date(),
      state: false,
      photographer: { id: photographerId },
      event: { id: eventId },
    });

    return await this.photographerxEventRepository.save(photographerxEvent);
  }

  async getPhotographersForEvent(eventId: number): Promise<PhotographerEvent[]> {
    const photographers = await this.photographerxEventRepository.find({
      where: {
        event: { id: eventId },
      },
      relations: ['photographer'],
    });
  
    return photographers;
  }

  async uploadImage(eventId: number, ){

  }




  
}
