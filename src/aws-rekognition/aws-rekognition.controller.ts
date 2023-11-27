import { Controller} from '@nestjs/common';
import { AwsRekognitionService } from './aws-rekognition.service';

@Controller('aws-rekognition')
export class AwsRekognitionController {
  constructor(private readonly awsRekognitionService: AwsRekognitionService) {}
}
