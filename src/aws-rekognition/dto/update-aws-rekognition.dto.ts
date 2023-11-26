import { PartialType } from '@nestjs/mapped-types';
import { CreateAwsRekognitionDto } from './create-aws-rekognition.dto';

export class UpdateAwsRekognitionDto extends PartialType(CreateAwsRekognitionDto) {}
