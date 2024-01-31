import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('organizer/signin')
  signInOrganizer( @Body() signInDto: SignInDto ) {
    return this.authService.signInOrganizer(signInDto);
  }

  @Post('photographer/signin')
  signInPhotographer( @Body() signInDto: SignInDto ) {
    return this.authService.signInPhotographer(signInDto);
  }
}
