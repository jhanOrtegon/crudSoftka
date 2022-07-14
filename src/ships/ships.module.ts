import { Module } from '@nestjs/common';
import { ShipsController } from './ships.controller';
import { ShipsService } from './ships.service';
import { Ship } from './entities/ships.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipTypes } from './entities/ship-types.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ship]),
    TypeOrmModule.forFeature([ShipTypes]),
  ],
  controllers: [ShipsController],
  providers: [ShipsService],
})
export class ShipsModule {}
