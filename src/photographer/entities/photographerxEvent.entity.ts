import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photographer } from "./photographer.entity";
import { Events } from "src/event/entities/event.entity";
import { Photography } from "src/event/entities/image.entity";

@Entity('photographer_event')
export class PhotographerxEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({default: false})
  state: boolean;

  @ManyToOne(() =>  Photographer, (photographer) => photographer.photographerxEvents)
  photographer: Photographer;

  @ManyToOne(() => Events, (event) => event.photographerxEvents)
  event: Events;

  @OneToMany(() => Photography, (photography) => photography.photographerxEvent)
  photographies: Photography[];
}