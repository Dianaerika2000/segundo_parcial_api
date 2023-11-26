import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './entities/event.entity';
import { OrganizerModule } from 'src/organizer/organizer.module';
import { MailModule } from 'src/mail/mail.module';
import { PhotographerModule } from 'src/photographer/photographer.module';
import { Photography } from './entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Events,
      Photography,
    ]),
    OrganizerModule,
    MailModule,
    PhotographerModule,
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
