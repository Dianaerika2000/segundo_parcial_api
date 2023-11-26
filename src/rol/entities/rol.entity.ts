import { Organizer } from 'src/organizer/entities/organizer.entity';
import { Photographer } from 'src/photographer/entities/photographer.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Organizer, (organizer) => organizer.rol)
  organizers: Organizer[];

  @OneToMany(() => Photographer, (photographer) => photographer.rol)
  photographers: Photographer[];
}
