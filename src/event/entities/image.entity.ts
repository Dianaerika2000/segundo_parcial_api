import { PhotographerEvent } from "src/photographer/entities/photographerEvent.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('photography')
export class Photography {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'photography_url'})
  photographyUrl: string

  @Column({ default: 20 })
  price: number;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @ManyToOne(() => PhotographerEvent, (event) => event.photographies)
  photographerEvent: PhotographerEvent;
}