import { Rol } from "src/rol/entities/rol.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PhotographerEvent } from "./photographerxevent.entity";

@Entity()
export class Photographer extends User {
  @Column({name: 'photographic_specialties'})
  photographicSpecialties: string;

  @ManyToOne(() =>  Rol, (rol) => rol.photographers)
  @JoinColumn({ name: 'rol_id'})
  rol: Rol;

  @OneToMany(() =>  PhotographerEvent, (photographerxEvent) => photographerxEvent.photographer)
  photographerxEvents: PhotographerEvent[];
}

