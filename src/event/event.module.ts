import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './entities/event.entity';
import { OrganizerModule } from 'src/organizer/organizer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Events,
    ]),
    OrganizerModule,
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
