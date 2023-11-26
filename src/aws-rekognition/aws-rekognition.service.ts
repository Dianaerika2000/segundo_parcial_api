import { Injectable } from '@nestjs/common';
import { CreateAwsRekognitionDto } from './dto/create-aws-rekognition.dto';
import { UpdateAwsRekognitionDto } from './dto/update-aws-rekognition.dto';

@Injectable()
export class AwsRekognitionService {
  create(createAwsRekognitionDto: CreateAwsRekognitionDto) {
    return 'This action adds a new awsRekognition';
  }

  findAll() {
    return `This action returns all awsRekognition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} awsRekognition`;
  }

  update(id: number, updateAwsRekognitionDto: UpdateAwsRekognitionDto) {
    return `This action updates a #${id} awsRekognition`;
  }

  remove(id: number) {
    return `This action removes a #${id} awsRekognition`;
  }
}
