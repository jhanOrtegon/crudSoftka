import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ShipTypes {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;
}
