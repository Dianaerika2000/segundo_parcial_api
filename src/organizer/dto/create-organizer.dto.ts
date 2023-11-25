import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateOrganizerDto {
  @IsString()
  name: string;

  @IsString()
  cellphone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  address: string;

  @IsString()
  company: string;

  @IsNumber()
  rolId: number;
}
