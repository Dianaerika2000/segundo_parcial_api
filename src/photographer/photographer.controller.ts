import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhotographerService } from './photographer.service';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { UpdatePhotographerDto } from './dto/update-photographer.dto';

@Controller('photographer')
export class PhotographerController {
  constructor(private readonly photographerService: PhotographerService) {}

  @Post()
  create(@Body() createPhotographerDto: CreatePhotographerDto) {
    return this.photographerService.create(createPhotographerDto);
  }

  @Get()
  findAll() {
    return this.photographerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photographerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotographerDto: UpdatePhotographerDto) {
    return this.photographerService.update(+id, updatePhotographerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photographerService.remove(+id);
  }

  @Post(':photographerId/accept-invitation/:eventId')
  acceptInvitation(@Param('photographerId') photographerId: number, @Param('eventId') eventId: number) {
    return this.photographerService.acceptInvitation(photographerId, eventId);
  }

  // @Post(':photographerId/reject-invitation/:eventId')
  // rejectInvitation(@Param('photographerId') photographerId: number, @Param('eventId') eventId: number) {
  //   return this.photographerService.rejectInvitation(photographerId, eventId);
  // }

  @Get(':photographerId/events')
  getEventsForPhotographer(@Param('photographerId') photographerId: number) {
    return this.photographerService.getEventsForPhotographer(photographerId);
  }

  @Get('/events/:eventId')
  getPhotographersForEvent(@Param('eventId') eventId: number) {
    return this.photographerService.getPhotographersForEvent(eventId);
  }

}
