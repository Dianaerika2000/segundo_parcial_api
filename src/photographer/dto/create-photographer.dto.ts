import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreatePhotographerDto {
  @IsString()
  name: string;

  @IsString()
  cellphone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  photographicSpecialties: string;

  @IsNumber()
  rolId: number;
}
