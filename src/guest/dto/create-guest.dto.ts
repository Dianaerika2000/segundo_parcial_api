import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateGuestDto {
  @IsString()
  name: string;

  @IsString()
  cellphone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  profile_url: string;

  @IsNumber()
  rolId: number;

  @IsNumber()
  eventId: number;
}
