import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Get('organizer/:organizerId')
  findAllByOrganizer(@Param('organizerId', ParseIntPipe) organizerId: number) {
    return this.eventService.getEventsForOrganizer(organizerId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }

  @Get(':eventId/photographers')
  getPhotographersForEvent(@Param('eventId') eventId: number) {
    return this.eventService.getPhotographersForEvent(eventId);
  }

  @Post(':eventId/photographers/:photographerId/images')
  @UseInterceptors(FileInterceptor('photo'))
  uploadImage(
    @UploadedFile() photo: Express.Multer.File,
    @Param('eventId')eventId: number,
    @Param('photographerId')photographerId: number,) {
    // return this.eventService.uploadImage(eventId, photographerId, photo);//arreglar
  }

  @Get('/invitation/photographer/:photographerId')
  getPhotographerInvitations(@Param('photographerId') photographerId: number) {
    return this.eventService.getPhotographerInvitations(photographerId);
  }
}
