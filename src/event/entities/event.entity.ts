import { GuestxEvent } from "src/guest/entities/guestxEvent.entity";
import { Organizer } from "src/organizer/entities/organizer.entity";
import { PhotographerEvent } from "src/photographer/entities/photographerEvent.entity";
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

  @Column({ nullable: true })
  collection: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @BeforeInsert()
  collectionName() {
    const collectionName = `evento_${this.id}`;
    this.collection = collectionName;
  }

  @ManyToOne(() => Organizer, (organizer) => organizer.events)
  @JoinColumn({ name: 'organizer_id' })
  organizer: Organizer;

  @OneToMany(() =>  PhotographerEvent, (photographerEvent) => photographerEvent.event)
  photographerEvents: PhotographerEvent[];

  @OneToMany(() => GuestxEvent, (guestxEvent) => guestxEvent.event)
  guestxEvents: GuestxEvent[];
}
