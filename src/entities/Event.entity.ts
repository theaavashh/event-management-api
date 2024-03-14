import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

	
}


