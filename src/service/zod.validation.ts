import {Request,Response, NextFunction } from "express";
import {z} from "zod";
import { Status } from "../types/status-enum";


const User=z.object({
	fullname:z.string({required_error:"Name is required"}),
	address:z.string(),
	email:z.string().email(),
	password:z.string(),
});

type TUserDetails=z.infer<typeof User>

const userValidation=(req:Request,res:Response,next:NextFunction)=>{
	const validationStatus=User.safeParse(req.body);
	if(validationStatus.success) next();
	else {
		const err=validationStatus.error.message;
		res.status(Status.bad_request).json({"validation-error":err});
	}	
};

export {userValidation, TUserDetails};
