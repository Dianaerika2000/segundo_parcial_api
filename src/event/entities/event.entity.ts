import { Organizer } from "src/organizer/entities/organizer.entity";
import { PhotographerxEvent } from "src/photographer/entities/PhotographerxEvent.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @ManyToOne(() => Organizer, (organizer) => organizer.events)
  @JoinColumn({ name: 'organizer_id' })
  organizer: Organizer;

  @OneToMany(() =>  PhotographerxEvent, (photographerxEvent) => photographerxEvent.event)
  photographerxEvents: PhotographerxEvent[];
}
