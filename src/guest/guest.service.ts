import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { RolService } from 'src/rol/rol.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { Repository } from 'typeorm';
import { AwsRekognitionService } from '../aws-rekognition/aws-rekognition.service';
import { QrService } from '../qr/qr.service';
import { ConfigService } from '@nestjs/config';
import { GuestxEvent } from './entities/guestxEvent.entity';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private  guestRepository: Repository<Guest>,

    @InjectRepository(GuestxEvent)
    private guestxEventRepository: Repository<GuestxEvent>,

    private readonly rolService: RolService,

    private awsRekognitionService: AwsRekognitionService,

    private readonly qrService: QrService,

    private readonly configService: ConfigService,
  ) {}

  async create(createGuestDto: CreateGuestDto, file: Express.Multer.File) {
    const { rolId, eventId } = createGuestDto;
    const rol = await this.rolService.findOne(rolId);

    const collectionName = this.configService.get('AWS_REKOGNITION_COLLECTION_NAME');
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

    const domainFront = this.configService.get('FRONTEND_DOMAIN');
    const url = `${domainFront}/event/invitation`;
    
    // const qrInvitacion = await this.qrService.generateQrCode(url)

    await this.guestRepository.save(guest);
    
    return {
      ...guest,
      // qrInvitacion
    }
  }

  findAll() {
    return `This action returns all guest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guest`;
  }

  async findOneByEmail(email: string) {
    const guest = await this.guestRepository.findOneBy({ email });
    if (!guest) {
      throw new BadRequestException(`Guest with email ${email} not found`);
    }
    return guest;
  }

  update(id: number, updateGuestDto: UpdateGuestDto) {
    return `This action updates a #${id} guest`;
  }

  remove(id: number) {
    return `This action removes a #${id} guest`;
  }

  async acceptInvitation(guestId: number, eventId: number, countGuests: number) {
    const guestxEvent = this.guestxEventRepository.create({
      date: new Date(),
      state: true,
      countGuests,
      guest: { id: guestId },
      event: { id: eventId },
    });

    return await this.guestxEventRepository.save(guestxEvent);
  }


  async getInvitation(guestId: number, eventId: number){


  }

  async getEventsForGuest(guestId: number): Promise<GuestxEvent[]> {
    const events = await this.guestxEventRepository.find({
      where: {
        guest: { id: guestId },
      },
      relations: ['event'],
    });

    return events;
  }

  // async getEventsForPhotographer(photographerId: number): Promise<PhotographerEvent[]> {
  //   const events = await this.photographerxEventRepository.find({
  //     where: {
  //       photographer: { id: photographerId },
  //     },
  //     relations: ['event'],
  //   });
  
  //   return events;
  // }

}
