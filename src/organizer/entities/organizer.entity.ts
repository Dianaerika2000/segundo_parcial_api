import { Rol } from "src/rol/entities/rol.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Organizer extends User {
  @Column()
  address: string;

  @Column()
  company: string;

  @ManyToOne(() => Rol, (rol) => rol.organizers)
  @JoinColumn({ name: 'rol_id'})
  rol: Rol;
}
