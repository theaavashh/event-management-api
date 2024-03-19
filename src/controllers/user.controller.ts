import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response } from "express";

import { wrapAsync } from "../utilits/asyncHandler.utilis";
import { ApiResponse } from "../utilits/ApiResponse.utilis";
import CustomError from "../utilits/ApiError.utilis";

import { generateAccessAndRefresh } from "../service/jwt.service";
import { authUser } from "../service/bcrypt.service";
import { sendingMail } from "../service/mail.service";

import { IRegUsers, IRenderData } from "../types/server";
import { Status } from "../types/status-enum";

import { AppDataSource } from "../config/datasource.config";
import { User } from "../entities/User.entity";

export const userRepo = AppDataSource.getRepository(User);

const registerUser = wrapAsync(
	async (req: IRegUsers, res: Response<ApiResponse>) => {
		const insertDetails = userRepo.create(req.body);
		const savedDetails = await userRepo.save(insertDetails);

		const { fullname, email, address, role, isVerified }: IRenderData =
			savedDetails;

		sendingMail("confirmation-mail.mjml", savedDetails);

		return res.status(Status.created).json(
			new ApiResponse(Status.success, "User Registration Success", {
				fullname,
				email,
				address,
				role,
				isVerified,
			}),
		);
	},
);

const loginUser = wrapAsync(async (req: Request, res: Response) => {
	const findUser = await userRepo.findOne({ where: { email: req.body.email } });

	if (!findUser) {
		throw new CustomError(Status.failed, "Invalid email or password");
	}

	if (!findUser?.isVerified) {
		throw new CustomError(Status.failed, "Email Verification Failed");
	}

	const isAuthenticate = await authUser(req.body.password, findUser.password!);

	if (!isAuthenticate)
		throw new CustomError(Status.failed, "Credential Match Failed");

	const { accessToken, refreshToken } = generateAccessAndRefresh(
		findUser.uid!,
		findUser.role!,
	);

	findUser.refreshToken = refreshToken;
	await userRepo.save(findUser);

	return res
		.status(Status.success)
		.cookie("accessToken", accessToken)
		.cookie("refreshToken", refreshToken)
		.json(new ApiResponse(200, "Login Success", { accessToken, refreshToken }));
});

const emailVerify = wrapAsync(async (req: Request, res: Response) => {
	if (!req.query.id)
		throw new CustomError(Status.failed, "Something went wrong");

	const uid = req.query.id as string;
	const data = await userRepo.findOne({ where: { uid } });

	if (!data) throw new CustomError(Status.failed, "Failed to verify email");

	data!.isVerified = true;
	await userRepo.save(data!);
	return res
		.status(Status.success)
		.json(new ApiResponse(Status.success, "Email verification successfully"));
});

const refreshGenerate = wrapAsync(async (req: Request, res: Response) => {
	const token = req.cookies.refreshToken;

	if (!token) {
		throw new CustomError(Status.failed, "Unauthorized Request");
	}
	try {
		const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

		if (!(decode && typeof decode == "object"))
			throw new CustomError(
				Status.failed,
				"Token expired or Unaccessed Token Status",
			);
		else {
			const value = decode.payload;
			const user = await userRepo.findOne({ where: { uid: value } });

			if (!(user?.refreshToken == token))
				throw new CustomError(
					Status.bad_request,
					"Token Expired or Unauthorized Access",
				);

			const { accessToken, refreshToken } = generateAccessAndRefresh(
				decode.payload,
				decode.role,
			);

			res
				.status(Status.success)
				.json(
					new ApiResponse(Status.created, "New Token Created", {
						accessToken,
						refreshToken,
					}),
				);
		}
	} catch (e) {
		console.log(e);
	}
});

export { registerUser, loginUser, emailVerify, refreshGenerate };
