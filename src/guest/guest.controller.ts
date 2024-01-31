import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('photo'))
  registert(
    @UploadedFile() photo: Express.Multer.File,
    @Body()data: any) {
    return this.guestService.create(data, photo);
  }

  @Get()
  findAll() {
    return this.guestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuestDto: UpdateGuestDto) {
    return this.guestService.update(+id, updateGuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestService.remove(+id);
  }

  @Post(':id/accept-invitation/event/:eventId')
  aceptInvitation(
    @Param('id') guestId: number,
    @Param('eventId') eventId: number,
    @Body('countGuests') countGuests: number
    ) {
    return this.guestService.acceptInvitation(guestId, eventId, countGuests);
  }

  @Get(':id/events')
  getEventsForGuest(@Param('id') id: number) {
    return this.guestService.getEventsForGuest(id);
  }
}
