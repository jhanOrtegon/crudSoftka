import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ShipTypesDto } from './dto/ship-types.dto';
import { ShipDto } from './dto/ship.dto';
import { ShipTypes } from './entities/ship-types.entity';
import { Ship } from './entities/ships.entity';
import { ShipsService } from './ships.service';

@Controller('ships')
export class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  // Ship types endpoints
  @Get('/shipTypes')
  getShipTypes(): Promise<ShipTypes[]> {
    return this.shipsService.getShipTypes();
  }

  @Get('/shipTypes/:id')
  getShipTypeById(@Param('id') id: string): Promise<ShipTypes> {
    return this.shipsService.getShipTypeById(id);
  }

  @Post('/shipTypes')
  createShipType(@Body() createShipType: ShipTypesDto): Promise<ShipTypes> {
    return this.shipsService.createShipType(createShipType);
  }

  @Delete('/shipTypes/:id')
  deleteShipType(@Param('id') id: string): Promise<ShipTypes> {
    return this.shipsService.deleteShipType(id);
  }

  @Put('/shipTypes/:id')
  updateShipType(
    @Param('id') id: string,
    @Body() updateShipType: ShipTypesDto,
  ): Promise<ShipTypes> {
    return this.shipsService.updateShipType(id, updateShipType);
  }

  // Ships endpoints
  @Get()
  getShips(): Promise<Ship[]> {
    return this.shipsService.getShips();
  }

  @Get('/:id')
  getShipById(@Param('id') id: string): Promise<Ship> {
    return this.shipsService.getShipById(id);
  }

  @Post()
  createShip(@Body() createShip: ShipDto): Promise<Ship> {
    return this.shipsService.createShip(createShip);
  }

  @Put('/:id')
  updateShip(
    @Param('id') id: string,
    @Body() updateShip: ShipDto,
  ): Promise<Ship> {
    return this.shipsService.updateShip(id, updateShip);
  }

  @Delete('/:id')
  deleteShip(@Param('id') id: string): Promise<Ship> {
    return this.shipsService.deleteShip(id);
  }
}
