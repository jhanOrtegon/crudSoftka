import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ShipTypes } from './ship-types.entity';

@Entity()
export class Ship {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @OneToOne(() => ShipTypes)
  @JoinColumn()
  shipType: ShipTypes;
}
