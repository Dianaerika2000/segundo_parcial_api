import { GuestxEvent } from "src/guest/entities/guestxEvent.entity";
import { Organizer } from "src/organizer/entities/organizer.entity";
import { PhotographerxEvent } from "src/photographer/entities/PhotographerxEvent.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  time: string;

  @Column()
  address: string;

  @Column()
  collection: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @BeforeInsert()
  collectionName() {
    const collectionName = `evento_${this.id}`;
  }

  @ManyToOne(() => Organizer, (organizer) => organizer.events)
  @JoinColumn({ name: 'organizer_id' })
  organizer: Organizer;

  @OneToMany(() =>  PhotographerxEvent, (photographerxEvent) => photographerxEvent.event)
  photographerxEvents: PhotographerxEvent[];

  @OneToMany(() => GuestxEvent, (guestxEvent) => guestxEvent.event)
  guestxEvents: GuestxEvent[];
}
