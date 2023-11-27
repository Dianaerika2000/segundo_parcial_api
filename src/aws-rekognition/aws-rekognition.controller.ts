import { Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AwsRekognitionService } from './aws-rekognition.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('aws-rekognition')
export class AwsRekognitionController {
  constructor(private readonly awsRekognitionService: AwsRekognitionService) {}

  @Post('create/collection')
  createCollection(@Body('collectionName') collectionName: string ) {
    return this.awsRekognitionService.createCollection(collectionName);
  }

  @Post('index-face')
  @UseInterceptors(FileInterceptor('profilePhoto'))
  indexFace(
    @UploadedFile() profilePhoto: Express.Multer.File,
    @Body('collectionName') collectionName: string) {
    return this.awsRekognitionService.indexFaceToCollection(profilePhoto.buffer, collectionName);
  }

  @Post('search-face')
  @UseInterceptors(FileInterceptor('photo'))
  getUsersByPhotography(
    @UploadedFile() photo: Express.Multer.File,
    @Body('collectionName') collectionName: string
  ) {
    return this.awsRekognitionService.getUsersByPhotography(photo.buffer, collectionName);
  }
}
