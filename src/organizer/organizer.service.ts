import { Injectable } from '@nestjs/common';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';
import { Repository } from 'typeorm';
import { RolService } from '../rol/rol.service';

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
      throw new Error('Organizer not found');
    }

    return organizer;
  }

  update(id: number, updateOrganizerDto: UpdateOrganizerDto) {
    return `This action updates a #${id} organizer`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizer`;
  }
}
