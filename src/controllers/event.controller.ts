import { Request,Response } from "express";
import { AppDataSource } from "../config/datasource.config";
import { Event } from "../entities/Event.entity";
import { Status } from "../types/status-enum";
import asyncHandler from "../utilits/asyncHandler.utilis";
import {format} from "date-fns";
import cron from "node-cron";
import { updateEventMail } from "../service/mail.service";

const eventRepo=AppDataSource.getRepository(Event);

const addEvent=asyncHandler(async(req:Request,res:Response)=>{
	if(req.body.role!="admin") return res.status(Status.bad_request).json({success:false, message:"Unauthorized access"});

	const file=req.file?.filename;
	const insertDetails=eventRepo.create({...req.body,thumbnail:file});
	const savedDetails=await eventRepo.save(insertDetails);
	res.status(Status.success).json({success:true, message:"Event Created Successfully", data:savedDetails});
	
});

const listEvent=asyncHandler(asyncHandler(async(req:Request,res:Response)=>{
	const fetchDetails=await eventRepo.find();
	res.json({success:true, data:fetchDetails});
})
);

cron.schedule(process.env.CRONJOB_STATUS as string,async()=>{
	const dates=format(new Date(2024,2,15), "yyyy-MM-dd");
	const formattedDate=new Date(dates);
	const event=await eventRepo.find({where:{createdAt:formattedDate}});
	updateEventMail("update-event.mjml",event);
});





export {addEvent, listEvent};
