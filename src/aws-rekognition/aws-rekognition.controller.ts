import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AwsRekognitionService } from './aws-rekognition.service';
import { CreateAwsRekognitionDto } from './dto/create-aws-rekognition.dto';
import { UpdateAwsRekognitionDto } from './dto/update-aws-rekognition.dto';

@Controller('aws-rekognition')
export class AwsRekognitionController {
  constructor(private readonly awsRekognitionService: AwsRekognitionService) {}

  @Post()
  create(@Body() createAwsRekognitionDto: CreateAwsRekognitionDto) {
    return this.awsRekognitionService.create(createAwsRekognitionDto);
  }

  @Get()
  findAll() {
    return this.awsRekognitionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.awsRekognitionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAwsRekognitionDto: UpdateAwsRekognitionDto) {
    return this.awsRekognitionService.update(+id, updateAwsRekognitionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.awsRekognitionService.remove(+id);
  }
}
