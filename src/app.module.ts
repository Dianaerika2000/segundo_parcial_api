import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrganizerModule } from './organizer/organizer.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { EventModule } from './event/event.module';
import { MailModule } from './mail/mail.module';
import { PhotographerModule } from './photographer/photographer.module';
import { AwsRekognitionModule } from './aws-rekognition/aws-rekognition.module';
import { GuestModule } from './guest/guest.module';
import { QrModule } from './qr/qr.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        // host: configService.get('DB_HOST'),
        // port: configService.get('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_DATABASE'),
        entities: ['dist/src/**/*.entity{.ts,.js}'],
        logging: true,
        autoLoadEntities: true,
        synchronize: true,
        cache: false,
        ssl: true,
      }),
    }),
    OrganizerModule,
    UserModule,
    RolModule,
    EventModule,
    MailModule,
    PhotographerModule,
    AwsRekognitionModule,
    GuestModule,
    QrModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
