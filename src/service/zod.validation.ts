import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { Status } from "../types/status-enum";
import CustomError from "../utilits/ApiError.utilis";

const User = z.object({
	fullname: z.string({ required_error: "Name is required" }),
	address: z.string(),
	email: z.string().email(),
	password: z.string(),
});

const Login = z.object({
	email: z.string().email(),
	password: z.string(),
});

const Event = z.object({
	title: z.string(),
	description: z.string(),
	seat: z.number(),
	price: z.number(),
});

type TUserDetails = z.infer<typeof User>;

const userValidation = (req: Request, res: Response, next: NextFunction) => {
	const validationStatus = User.safeParse(req.body);
	if (validationStatus.success) next();
	else {
		const err = JSON.stringify(validationStatus.error.errors);
		throw new CustomError(Status.bad_request, "Validation Failed", err);
	}
};

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
	const validationStatus = Login.safeParse(req.body);
	if (validationStatus.success) next();
	else {
		const err = validationStatus.error.errors;
		res.status(Status.bad_request).json({ "validation-error": err });
	}
};

const eventValidation = (req: Request, res: Response, next: NextFunction) => {
	req.body.seat = parseInt(req.body.seat);
	req.body.price = parseInt(req.body.price);
	const validationStatus = Event.safeParse(req.body);
	if (validationStatus.success) next();
	else {
		const err = validationStatus.error.errors;
		res.status(Status.bad_request).json({ "validation-error": err });
	}
};

export { userValidation, eventValidation, loginValidation, TUserDetails };
