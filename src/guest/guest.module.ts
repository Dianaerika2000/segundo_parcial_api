import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { GuestxEvent } from './entities/guestxEvent.entity';
import { RolModule } from 'src/rol/rol.module';
import { AwsRekognitionModule } from 'src/aws-rekognition/aws-rekognition.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Guest,
      GuestxEvent,
    ]),
    RolModule,
    AwsRekognitionModule,
  ],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}
