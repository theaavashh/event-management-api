import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({name:"Event"})
export class Event{
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		title: string;

	@Column()
		description: string;

	@Column()
		thumbnail: string;

	@Column()
		price: number;

	@Column({type:"date", default: () => "CURRENT_TIMESTAMP"})
		createdAt:Date;

	@ManyToMany(()=> User,{eager:true})
	@JoinTable()
		user:User[];

}


