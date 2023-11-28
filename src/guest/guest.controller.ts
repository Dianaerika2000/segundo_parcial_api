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
}
