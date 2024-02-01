import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  organizer_id: number;

  @Column()
  photographer_id: number;

  @Column()
  event_id: number;

  @Column({default: 'pendiente'})
  status: string; // pendiente, aceptado, rechazado
}