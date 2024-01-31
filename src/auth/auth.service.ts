import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { OrganizerService } from '../organizer/organizer.service';
import { PhotographerService } from '../photographer/photographer.service';
import { CreateOrganizerDto } from 'src/organizer/dto/create-organizer.dto';
import { CreatePhotographerDto } from 'src/photographer/dto/create-photographer.dto';
import { GuestService } from '../guest/guest.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly organizerService: OrganizerService,
    private readonly photographerService: PhotographerService,
    private readonly guestService: GuestService
  ){}

  async signInOrganizer(signInDto:SignInDto): Promise<any> {
    const { email, password } = signInDto;
    const organizer = await this.organizerService.findOneByEmail(email);

    if (organizer?.password !== password) {
      throw new UnauthorizedException();
    }
    return {
      id: organizer.id,
      email: organizer.email,
      token: this.getJwtToken({ email })
    };
  }

  async signInPhotographer(signInDto:SignInDto): Promise<any> {
    const { email, password } = signInDto;
    const photographer = await this.photographerService.findOneByEmail(email);

    if (photographer?.password !== password) {
      throw new UnauthorizedException();
    }
    return {
      id: photographer.id,
      email: photographer.email,
      token: this.getJwtToken({ email }),
    };
  }

  async signInGuest(SignInDto: SignInDto){
    const { email, password } = SignInDto;
    const guest = await this.guestService.findOneByEmail(email);

    if (guest?.password !== password) {
      throw new UnauthorizedException();
    }

    return {
      ...guest,
      token: this.getJwtToken({ email }),
    };
  }

  async signupOrganizer(signUpDto: CreateOrganizerDto): Promise<any> {
    const organizer = await this.organizerService.create(signUpDto);
    return organizer;
  }

  async signupPhotographer(signUpDto: CreatePhotographerDto): Promise<any> {
    const photographer = await this.photographerService.create(signUpDto);
    return photographer;
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

}
