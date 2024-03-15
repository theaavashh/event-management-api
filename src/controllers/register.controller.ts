import { Request,Response } from "express";
import asyncHandler from "../utilits/asyncHandler.utilis";
import { AppDataSource } from "../config/datasource.config";
import { User } from "../entities/User.entity";
import { Event } from "../entities/Event.entity";
import { Status } from "../types/status-enum";
import { bookingEventMail } from "../service/mail.service";

const eventRepo=AppDataSource.getRepository(Event);
const userRepo=AppDataSource.getRepository(User);

const registerEvent=asyncHandler(async(req:Request,res:Response)=>{
	const userDetails=await userRepo.find({where:{uid:req.body.payload}});
	const eventDetails=await eventRepo.findOne({where:{id:2}});
	const data={...eventDetails};
	data.user=userDetails;
	const status=await eventRepo.save(data);
	if(status){
		res.status(Status.success).json({success:true,message:"Thank For Event Registration"});
		bookingEventMail("confirmation-booking.mjml",userDetails[0].fullname, userDetails[0].email);
	}
});

const showEvent=asyncHandler(async()=>{
	const d=await eventRepo.find();
	console.log(d);
});


export {registerEvent, showEvent};