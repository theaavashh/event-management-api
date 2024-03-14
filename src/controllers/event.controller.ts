import { Request,Response } from "express";
import { AppDataSource } from "../config/datasource.config";
import { Event } from "../entities/Event.entity";
import { Status } from "../types/status-enum";

const eventRepo=AppDataSource.getRepository(Event);

const addEvent=async(req:Request,res:Response)=>{
	try{
		const file=req.file?.filename;
		const insertDetails=eventRepo.create({...req.body,thumbnail:file});
		const savedDetails=await eventRepo.save(insertDetails);
		res.status(Status.success).json({success:true, message:"Event Created Successfully", data:savedDetails});
	}
	catch(e){
		console.log("failed");
	}
};

const listEvent=async(req:Request,res:Response)=>{
	try{
		const fetchDetails=await eventRepo.find();
		res.json({success:true, data:fetchDetails});
	}
	catch(e){
		console.log("Failed");
	}
};

export {addEvent, listEvent};
