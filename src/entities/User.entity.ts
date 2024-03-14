import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"User"})
export class User{
	@PrimaryGeneratedColumn()
		uid:string;

	@Column()
		fullname:string;

	@Column()
		address:string;

	@Column()
		email:string;

	@Column()
		password:string;

	@Column({default:"user"})
		role:string;

	@Column({default:false})
		isVerified:boolean;
	
}






