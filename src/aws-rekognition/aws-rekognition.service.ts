import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CreateCollectionCommand, IndexFacesCommand, RekognitionClient, SearchFacesByImageCommand, SearchFacesByImageCommandOutput } from '@aws-sdk/client-rekognition';

@Injectable()
export class AwsRekognitionService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  async createCollection(collectionName: string) {
    const rekognitionClient = new RekognitionClient({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    try {
      const data = await rekognitionClient.send(
        new CreateCollectionCommand({ CollectionId: collectionName }),
      );

      return data;
    } catch (error) {
      console.log('Error', error.stack);
    }
  }

  async indexFaceToCollection(profilePhoto: Buffer, collectionName: string = "evento_prueba") {
    // Step 1: Connects to AWS Rekognition service
    const rekognitionClient = new RekognitionClient({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  
    // Index the face in the collection
    const insertInCollectionResult = await rekognitionClient.send(
      new IndexFacesCommand({
        CollectionId: collectionName,
        Image: {
          Bytes: profilePhoto,
        },
        MaxFaces: 1,
        QualityFilter: 'MEDIUM',
      }),
    );

    const faceId = insertInCollectionResult?.FaceRecords[0]?.Face?.FaceId;
    const successfullyInsertedInCollection = insertInCollectionResult.$metadata.httpStatusCode === 200 && faceId;
    
    // Step 2: Call the `uploadProfilePhotoToS3()` function to upload the user's image to S3
    const { profilePhotoUrl } = await this.uploadProfilePhotoToS3(profilePhoto, faceId);
    
    if (successfullyInsertedInCollection) {
      return {
        message: 'Successfully indexed the face in the collection.',
        faceId,
        img_url: profilePhotoUrl
      };
    } else {
      return {
        error: 'Something went wrong while indexing the face in the collection.',
      };
    }
  }

  async uploadProfilePhotoToS3( profilePhotoBuffer: Buffer, faceId: string) {
    const s3Bucket = this.configService.get('AWS_S3_BUCKET');

    // Step 1: Connects to AWS S3 service
    const s3Client = new S3Client({
      region: this.configService.get('AWS_REGION_S3'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    // Step 2: Create an S3 object with the user's image
    const s3Object = await s3Client.send(
      new PutObjectCommand({
        Bucket: s3Bucket,
        Key: `user_avatar_${faceId}.jpeg`,
        Body: profilePhotoBuffer,
        ContentType: 'image/jpeg',
      }),
    );
    
    const s3ObjectUrl = `https://${s3Bucket}.s3.amazonaws.com/user_avatar_${faceId}.jpeg`;
  
    return {
      profilePhotoUrl: s3ObjectUrl,
    };
  }

  async getUsersByPhotography(photography: Buffer, collectionName: string = "evento_prueba") {

    // Connects to AWS Rekognition service
    const rekognitionClient = new RekognitionClient({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      }
    });

    // Search faces in our collection using the main face from the image (if it exist)
    const searchFacesResult: SearchFacesByImageCommandOutput = await rekognitionClient.send(new SearchFacesByImageCommand({
      CollectionId: collectionName,
      Image: {
        Bytes: photography
      },
      MaxFaces: 20,
      QualityFilter: 'NONE'
    }))

    const faceIds = this.getFaceIdsFromSearchFacesResult(searchFacesResult)

    const found = searchFacesResult?.$metadata?.httpStatusCode === 200 && faceIds.length > 0

    if (found) {
      return {
        message: 'Successfully found users by photography.',
        users: faceIds
      }
      // return searchFacesResult;
    } else {
      return {
        error: "Couldn't find users by photo."
      }
    }
  }

  private getFaceIdsFromSearchFacesResult(searchFacesResult: SearchFacesByImageCommandOutput) {
    return searchFacesResult.FaceMatches.map((faceMatch) => {
      return {
        faceId: faceMatch.Face.FaceId,
        similarity: faceMatch.Similarity,
      };
    });
  }

  async uploadPhotography(photography: Buffer, photographerId: string) {
    const s3Bucket = this.configService.get('AWS_S3_BUCKET');

    // Step 1: Connects to AWS S3 service
    const s3Client = new S3Client({
      region: this.configService.get('AWS_REGION_S3'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    // Step 2: Create an S3 object
    const s3Object = await s3Client.send(
      new PutObjectCommand({
        Bucket: s3Bucket,
        Key: `img_${photographerId}.jpeg`,
        Body: photography,
        ContentType: 'image/jpeg',
      }),
    );

    console.log("s3Object", s3Object);
    
    const s3ObjectUrl = `https://${s3Bucket}.s3.amazonaws.com/img_${photographerId}.jpeg`;
  
    return {
      profilePhotoUrl: s3ObjectUrl,
    };
  }
}
