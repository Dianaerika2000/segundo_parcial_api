import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) { }

  async create(createRolDto: CreateRolDto) {
    const rol = this.rolRepository.create(createRolDto);
    return await this.rolRepository.save(rol);
  }

  async findAll() {
    return await this.rolRepository.find();
  }

  async findOne(id: number) {
    const rol = await this.rolRepository.findOneBy({ id });
    if (!rol) {
      throw new NotFoundException(`Rol #${id} not found`);
    }

    return rol;
  }

  update(id: number, updateRolDto: UpdateRolDto) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
