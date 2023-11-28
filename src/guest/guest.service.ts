import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { RolService } from 'src/rol/rol.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { Repository } from 'typeorm';
import { AwsRekognitionService } from '../aws-rekognition/aws-rekognition.service';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private  guestRepository: Repository<Guest>,
    private readonly rolService: RolService,
    private awsRekognitionService: AwsRekognitionService,
  ) {}

  async create(createGuestDto: CreateGuestDto, file: Express.Multer.File) {
    const { rolId, eventId } = createGuestDto;
    const rol = await this.rolService.findOne(rolId);

    const collectionName = `evento_${eventId}`;
    const indexFaceResult = await this.awsRekognitionService.indexFaceToCollection(file.buffer, collectionName);
    
    if (indexFaceResult.error) {
      throw new BadRequestException('Error indexing face');
    }

    const guest = this.guestRepository.create({
      ...createGuestDto,
      faceId: indexFaceResult.faceId,
      profile_url: indexFaceResult.img_url,
      rol: rol,
    });

    return this.guestRepository.save(guest);
  }

  findAll() {
    return `This action returns all guest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guest`;
  }

  update(id: number, updateGuestDto: UpdateGuestDto) {
    return `This action updates a #${id} guest`;
  }

  remove(id: number) {
    return `This action removes a #${id} guest`;
  }
}
