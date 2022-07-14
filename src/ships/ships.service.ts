import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipTypesDto } from './dto/ship-types.dto';
import { ShipTypes } from './entities/ship-types.entity';
import { Ship } from './entities/ships.entity';
import { nanoid } from 'nanoid';
import { ShipDto } from './dto/ship.dto';

@Injectable()
export class ShipsService {
  constructor(
    @InjectRepository(Ship)
    private readonly shipRepository: Repository<Ship>,
    @InjectRepository(ShipTypes)
    private readonly shipTypesRepository: Repository<ShipTypes>,
  ) {}

  // Ship types endpoints

  async getShipTypes(): Promise<ShipTypes[]> {
    const shipTypes = await this.shipTypesRepository.find();
    if (shipTypes.length <= 0)
      throw new NotFoundException('Ship types not found');
    return shipTypes;
  }

  async getShipTypeById(id: string): Promise<any> {
    const shipType = await this.shipTypesRepository.findOne({ where: { id } });
    if (!shipType) throw new NotFoundException('Ship type not found');
    return shipType;
  }

  async createShipType({ description }: ShipTypesDto): Promise<ShipTypes> {
    const validateShip = await this.shipTypesRepository.findOne({
      where: { description },
    });

    if (validateShip) throw new NotFoundException('Ship type already exists');

    const shipType = this.shipTypesRepository.create({
      id: nanoid(32),
      description,
    });

    await this.shipTypesRepository.save(shipType);

    return shipType;
  }

  async deleteShipType(id: string): Promise<any> {
    const validateShip = await this.getShipTypeById(id);
    const deleteShipType = await this.shipTypesRepository.delete({ id });
    return { message: 'Ship type deleted' };
  }

  async updateShipType(
    id: string,
    { description }: ShipTypesDto,
  ): Promise<any> {
    const Ship = await this.getShipTypeById(id);
    Ship.description = description;

    await this.shipTypesRepository.save(Ship);

    return Ship;
  }

  // Ships endpoints

  async getShips(): Promise<Ship[]> {
    const ships = await this.shipRepository.find();
    if (ships.length <= 0) throw new NotFoundException('Ships not found');
    return ships;
  }

  async getShipById(id: string): Promise<Ship> {
    const ship = await this.shipRepository.findOne({ where: { id } });
    if (!ship) throw new NotFoundException('Ship not found');
    return ship;
  }

  async createShip({ description, shipType }: ShipDto): Promise<Ship> {
    const validateShip = await this.shipRepository.findOne({
      where: { description },
    });

    if (validateShip) throw new NotFoundException('Ship already exists');

    const validateShipType = await this.getShipTypeById(shipType);
    if (!validateShipType) throw new NotFoundException('Invalid ship type');

    const ship = this.shipRepository.create({
      id: nanoid(32),
      description,
      shipType: validateShipType,
    });

    await this.shipRepository.save(ship);

    return ship;
  }

  async deleteShip(id: string): Promise<any> {
    const ship = await this.getShipById(id);

    const deleteShip = await this.shipRepository.delete({ id });

    return { message: 'Ship deleted' };
  }

  async updateShip(
    id: string,
    { description, shipType }: ShipDto,
  ): Promise<any> {
    const ship = await this.getShipById(id);
    if (!ship) throw new NotFoundException('Ship not found');

    const validateShipType = await this.getShipTypeById(shipType);
    if (!validateShipType) throw new NotFoundException('Invalid ship type');

    ship.description = description;
    ship.shipType = validateShipType;

    await this.shipRepository.save(ship);

    return ship;
  }
}
