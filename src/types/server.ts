import { Request } from "express";

export interface IRegUsers extends Request {
	body: {
		fullname: string;
		email: string;
		password: string;
		address: string;
	};
}

export interface IRenderData {
	fullname: string;
	email: string;
	password: string;
	address: string;
	role: string;
	isVerified: boolean;
}

export type TPort = string | number;

export interface IRes extends Request {
	body: {
		fullname: string;
	};
}
