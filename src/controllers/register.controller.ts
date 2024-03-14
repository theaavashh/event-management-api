//import { Request,Response } from "express";
//import asyncHandler from "../utilits/asyncHandler.utilis";
//import { AppDataSource } from "../config/datasource.config";
//import { Event } from "../entities/Event.entity";
//import { Event_Registration } from "../entities/EventRegistration.entity";

////const eventRepo=AppDataSource.getRepository(Event);
////const regEventRepo=AppDataSource.getRepository(Event_Registration);

////const registerEvent=asyncHandler(async(req:Request,res:Response)=>{
////	const a=parseInt(req.params.id);
////	const findEvent=await regEventRepo.findOne({where:{event:{id:a}}});
////	if(findEvent){
		
////	}
	
////});

//const showEvent=asyncHandler(async()=>{
//	const d=await regEventRepo.find();
//	console.log(d);
//});


//export {registerEvent, showEvent};