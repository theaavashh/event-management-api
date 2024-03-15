import asyncHandler from "../utilits/asyncHandler.utilis";
import {generateToken} from "../service/jwt.service";

import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource.config";
import { User } from "../entities/User.entity";

import { Status } from "../types/status-enum";
import { IResRegister, TLogin } from "../types/event-types";

import { authUser } from "../service/bcrypt.service";
import { TUserDetails } from "../service/zod.validation";
import { sendingMail } from "../service/mail.service";

const userRepo = AppDataSource.getRepository(User);

const registerUser = asyncHandler(async (req: Request<{},{},TUserDetails>, res: Response<IResRegister>) => {
	const insertDetails = userRepo.create(req.body);
	const savedDetails = await userRepo.save(insertDetails);
	res.status(Status.success).json({
		success: true,
		message: "User Registration Success",
		data: savedDetails,
	});
	const userDetails={...savedDetails};
	sendingMail("confirmation-mail.mjml", userDetails);
});


const loginUser = asyncHandler(async (req: Request<{},{},TLogin>, res: Response) => {
	const findUser = await userRepo.findOneBy({ email: req.body.email });

	if(!findUser) res.status(Status.failed).json({success:false,error:"Verficiation Failed",mesage:"Invalid email or password"});

	if(!findUser?.isVerified) res.status(Status.failed).json({success:false, message:"Email verification Failed"});

	const data={...findUser};

	const isAuthenticate=await authUser(req.body.password,data.password! );

	if(!isAuthenticate) res.status(Status.bad_request).json({success:false, message:"Credential Match Failed"});

	const token=generateToken(data.uid!,data.role!);
	res.status(Status.success).json({success:true, message: "Login Success", token});
});


const emailVerify=asyncHandler(async(req:Request,res:Response)=>{
	if(req.query.id){
		const uid=req.query.id as string;
		const data=await userRepo.findOne({where:{uid}});
		if(!data) res.status(200).json({success:true, message:"Failed to verify email"});

		data!.isVerified=true;
		await userRepo.save(data!);
		return res.status(200).json({success:true, message:"Email verification successfully"});
	}
	res.status(Status.bad_request).json({success:false,message:"Something went wrong"});
});




export { registerUser, loginUser, emailVerify };
