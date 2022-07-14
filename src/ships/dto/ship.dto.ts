import { IsNotEmpty } from 'class-validator';

export class ShipDto {
  id?: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  shipType: string;
}
