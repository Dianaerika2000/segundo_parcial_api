import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { GuestxEvent } from "./guestxEvent.entity";
import { Rol } from "src/rol/entities/rol.entity";

@Entity('guest')
export class Guest extends User {
  @Column({ name: 'face_id'})
  faceId: string;

  @Column()
  profile_url: string;

  @ManyToOne(() =>  Rol, (rol) => rol.guests)
  @JoinColumn({ name: 'rol_id'})
  rol: Rol;

  @OneToMany(() => GuestxEvent, (guestxEvent) => guestxEvent.guest)
  guestxEvents: GuestxEvent[];
}

