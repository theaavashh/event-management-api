import bcrypt from "bcrypt";
import { NextFunction, Request, Response} from "express";
import { TUserDetails } from "./zod.validation";

// eslint-disable-next-line @typescript-eslint/ban-types
const hashedPassword=async(req:Request<{},{},TUserDetails>,_:Response,next:NextFunction)=>{
	const encrypt=await bcrypt.hash(req.body.password,10);
	req.body.password=encrypt;
	next();
};

const authUser=async(userPassword:string,encryptPass:string):Promise<boolean>=>{
	const data=await bcrypt.compare(userPassword,encryptPass);
	return data;
};


export {hashedPassword, authUser};