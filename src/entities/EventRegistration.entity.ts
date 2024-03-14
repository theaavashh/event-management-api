import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event.entity";
import { User } from "./User.entity";


@Entity({name:"Event_Registration"})
export class Event_Registration{
	@PrimaryGeneratedColumn()
		reg_id:number;

	@OneToOne(()=>Event, {cascade:true, eager:true})
	@JoinColumn()
		event:Event;

	@ManyToMany(()=>User)
	@JoinTable()
		user:User[];
}