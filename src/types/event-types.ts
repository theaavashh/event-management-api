import { TUserDetails } from "../service/zod.validation";

export interface IAddEvent{
	title:string,
	description:string,
	thumbnail:string,
	seat: number,
	price: number

}
export interface IResRegister{
	success:boolean,
	message:string,
	data:object
}

export type TLogin = Pick<TUserDetails, "email" | "password"  >

type Uid={
	uid:string;
};

export type TUser=TUserDetails & Uid;