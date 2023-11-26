import { IsDateString, IsEmail, IsNumber, IsObject, IsString } from "class-validator";

class EventDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsString()
  time: string;

  @IsString()
  address: string;
} 

export class CreateMailDto {
  @IsEmail()
  email: string;

  @IsNumber()
  cant: number;

  @IsObject()
  event: EventDto;
}
