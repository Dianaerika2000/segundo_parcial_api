import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateOrganizerDto } from 'src/organizer/dto/create-organizer.dto';
import { CreatePhotographerDto } from 'src/photographer/dto/create-photographer.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('organizer/signin')
  async signInOrganizer( @Body() signInDto: SignInDto ) {
    return await this.authService.signInOrganizer(signInDto);
  }

  @Post('photographer/signin')
  signInPhotographer( @Body() signInDto: SignInDto ) {
    return this.authService.signInPhotographer(signInDto);
  }

  @Post('guest/signin')
  signInGuest( @Body() signInDto: SignInDto ) {
    return this.authService.signInGuest(signInDto);
  }

  @Post('organizer/signup')
  signupOrganizer( @Body() signUpDto: CreateOrganizerDto ) {
    return this.authService.signupOrganizer(signUpDto);
  }

  @Post('photographer/signup')
  signupPhotographer( @Body() signUpDto: CreatePhotographerDto ) {
    return this.authService.signupPhotographer(signUpDto);
  }
}
