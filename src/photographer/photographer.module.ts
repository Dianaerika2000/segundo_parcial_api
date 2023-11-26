import { Module } from '@nestjs/common';
import { PhotographerService } from './photographer.service';
import { PhotographerController } from './photographer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photographer } from './entities/photographer.entity';
import { RolModule } from 'src/rol/rol.module';
import { PhotographerxEvent } from './entities/PhotographerxEvent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Photographer,
      PhotographerxEvent,
    ]),
    RolModule,
  ],
  controllers: [PhotographerController],
  providers: [PhotographerService],
  exports: [PhotographerService, TypeOrmModule],
})
export class PhotographerModule {}
