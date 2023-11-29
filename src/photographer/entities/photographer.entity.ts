import { Rol } from "src/rol/entities/rol.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PhotographerxEvent } from "./photographerxevent.entity";

@Entity()
export class Photographer extends User {
  @Column({name: 'photographic_specialties'})
  photographicSpecialties: string;

  @ManyToOne(() =>  Rol, (rol) => rol.photographers)
  @JoinColumn({ name: 'rol_id'})
  rol: Rol;

  @OneToMany(() =>  PhotographerxEvent, (photographerxEvent) => photographerxEvent.photographer)
  photographerxEvents: PhotographerxEvent[];
}

