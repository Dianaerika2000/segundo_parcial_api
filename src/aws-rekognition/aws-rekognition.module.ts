import { Module } from '@nestjs/common';
import { AwsRekognitionService } from './aws-rekognition.service';
import { AwsRekognitionController } from './aws-rekognition.controller';

@Module({
  controllers: [AwsRekognitionController],
  providers: [AwsRekognitionService],
})
export class AwsRekognitionModule {}
