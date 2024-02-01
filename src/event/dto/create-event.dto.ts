import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEmail, IsNumber, IsString, ValidateNested } from "class-validator";

class People {
  @IsEmail()
  email: string;

  @IsNumber()
  cant: number;
}

export class CreateEventDto {
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

  @IsNumber()
  organizerId: number;

  @IsEmail()
  photographerEmail: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => People)
  people: People[];
}
