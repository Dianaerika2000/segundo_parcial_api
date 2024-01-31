import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { GuestxEvent } from './entities/guestxEvent.entity';
import { RolModule } from 'src/rol/rol.module';
import { AwsRekognitionModule } from 'src/aws-rekognition/aws-rekognition.module';
import { QrModule } from 'src/qr/qr.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Guest,
      GuestxEvent,
    ]),
    RolModule,
    AwsRekognitionModule,
    QrModule
  ],
  controllers: [GuestController],
  providers: [GuestService],
  exports: [GuestService]
})
export class GuestModule {}
