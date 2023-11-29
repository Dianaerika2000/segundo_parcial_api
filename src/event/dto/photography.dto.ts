import { IsNumber, IsString } from "class-validator";

export class PhotographyDto {
  @IsNumber()
  price: number;

  @IsNumber()
  eventId: number

  @IsNumber()
  photographerId: number
}