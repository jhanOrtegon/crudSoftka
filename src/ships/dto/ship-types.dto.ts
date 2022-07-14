import { IsNotEmpty } from 'class-validator';

export class ShipTypesDto {
  id?: string;
  @IsNotEmpty()
  description: string;
}
