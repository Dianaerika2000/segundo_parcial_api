import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photographer } from "./photographer.entity";
import { Events } from "../../event/entities/event.entity";
import { Photography } from "../../event/entities/image.entity";

@Entity('photographer_event')
export class PhotographerEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({default: false})
  state: boolean;

  @ManyToOne(() =>  Photographer, (photographer) => photographer.photographerEvents)
  photographer: Photographer;

  @ManyToOne(() => Events, (event) => event.photographerEvents)
  event: Events;

  @OneToMany(() => Photography, (photography) => photography.photographerEvent)
  photographies: Photography[];
}