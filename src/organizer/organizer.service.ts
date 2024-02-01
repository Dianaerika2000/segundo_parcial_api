import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';
import { Repository } from 'typeorm';
import { RolService } from '../rol/rol.service';
import { Events } from 'src/event/entities/event.entity';

@Injectable()
export class OrganizerService {
  constructor(
    @InjectRepository(Organizer)
    private organizerRepository: Repository<Organizer>,
    private rolService: RolService,
  ) {}

  async create(createOrganizerDto: CreateOrganizerDto) {
    const { rolId } = createOrganizerDto;
    const rol = await this.rolService.findOne(rolId);
  
    const organizer = this.organizerRepository.create({
      ...createOrganizerDto,
      rol: rol,
    });

    return this.organizerRepository.save(organizer);
  }

  findAll() {
    return `This action returns all organizer`;
  }

  async findOne(id: number) {
    const organizer = await this.organizerRepository.findOneBy({ id });
    
    if (!organizer) {
      throw new NotFoundException(`Organizer with ID ${id} not found`);
    }

    return organizer;
  }

  async findOneByEmail(email: string) {
    const organizer = await this.organizerRepository.findOneBy({ email: email });
    
    if (!organizer) {
      throw new NotFoundException(`Organizer with email ${email} not found`);
    }

    return organizer;
  }

  update(id: number, updateOrganizerDto: UpdateOrganizerDto) {
    return `This action updates a #${id} organizer`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizer`;
  }

    async getEventsForOrganizer(organizerId: number): Promise<Events[]> {
    const organizer = await this.organizerRepository
      .createQueryBuilder('organizer')
      .leftJoinAndSelect('organizer.events', 'event')
      .where('organizer.id = :id', { id: organizerId })
      .getOne();

    if (!organizer) {
      throw new NotFoundException(`Organizer with ID ${organizerId} not found`);
    }

    return organizer.events;
  }
}
