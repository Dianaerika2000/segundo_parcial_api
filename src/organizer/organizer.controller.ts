import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';

@Controller('organizer')
export class OrganizerController {
  constructor(private readonly organizerService: OrganizerService) {}

  @Post()
  create(@Body() createOrganizerDto: CreateOrganizerDto) {
    return this.organizerService.create(createOrganizerDto);
  }

  @Get()
  findAll() {
    return this.organizerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.organizerService.findOne(id);
  }
  
  @Get(':email/email')
  findOneByEmail(@Param('email') email: string) {
    return this.organizerService.findOneByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizerDto: UpdateOrganizerDto) {
    return this.organizerService.update(+id, updateOrganizerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizerService.remove(+id);
  }

  @Get(':id/events')
  getEventsForOrganizer(@Param('id', ParseIntPipe) id: number) {
    return this.organizerService.getEventsForOrganizer(id);
  }
}
