import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PhotographerModule } from 'src/photographer/photographer.module';
import { OrganizerModule } from 'src/organizer/organizer.module';
import { GuestModule } from 'src/guest/guest.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
        };
      },
    }),
    PhotographerModule,
    OrganizerModule,
    GuestModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
