import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Guest } from "./guest.entity";
import { Events } from "src/event/entities/event.entity";

@Entity('guest_event')
export class GuestxEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ name: 'count_guests'})
  countGuests: number;

  @Column({default: false})
  state: boolean;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @ManyToOne(() => Guest, (guest) => guest.guestxEvents)
  guest: Guest;

  @ManyToOne(() => Events, (event) => event.guestxEvents)
  event: Events;
}