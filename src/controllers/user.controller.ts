import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource.config";
import { User } from "../entities/User.entity";
import asyncHandler from "../utilits/asyncHandler.utilis";
import { Status } from "../types/status-enum";
import { authUser } from "../service/bcrypt.service";
import generateToken from "../service/jwt.service";
import { TUserDetails } from "../service/zod.validation";
import { IResRegister, TLogin } from "../types/event-types";
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
	sendingMail();
});

const loginUser = asyncHandler(async (req: Request<{},{},TLogin>, res: Response) => {
	const findUser = await userRepo.findOneBy({ email: req.body.email });

	if(!findUser) res.status(Status.failed).json({success:false,error:"Verficiation Failed",mesage:"Invalid email or password"});

	const data={...findUser};

	const isAuthenticate=await authUser(req.body.password,data.password! );

	if(!isAuthenticate) res.status(Status.bad_request).json({success:false, message:"Credential Match Failed"});

	const token=generateToken(data.uid!);
	res.status(Status.success).json({success:true, message: "Login Success", token});
});



export { registerUser, loginUser };
