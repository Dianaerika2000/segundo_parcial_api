import { Events } from "src/event/entities/event.entity";
import { Rol } from "src/rol/entities/rol.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Organizer extends User {
  @Column()
  address: string;

  @Column()
  company: string;

  @ManyToOne(() => Rol, (rol) => rol.organizers)
  @JoinColumn({ name: 'rol_id'})
  rol: Rol;

  @OneToMany(() => Events, (event) => event.organizer)
  events: Events[];
}
