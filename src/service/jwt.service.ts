import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


const generateToken = (payload:string,role:string) => {
	const token=jwt.sign({payload,role},process.env.JWT_SECRET_KEY as string);
	return token;
};


const verifyToken=(req:Request,_:Response,next:NextFunction)=>{
	const token=req.headers.authorization;
	const auth=token?.split(" ")[1];
	const data=jwt.decode(auth as string);
	if(data && typeof data=="object"){
		req.body.role=data.role;
		req.body.payload=data.payload;
		next();
	}
};


export {generateToken,verifyToken};


