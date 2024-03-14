import {Request,Response, NextFunction } from "express";


// eslint-disable-next-line @typescript-eslint/ban-types
const asyncHandler=(requestHandler:Function)=>{
	return (req:Request,res:Response,next:NextFunction)=>{
		Promise.resolve(requestHandler(req,res,next)).catch(next);
	};
};

export default asyncHandler;