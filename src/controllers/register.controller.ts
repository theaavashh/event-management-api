import { Request, Response } from "express";
import { wrapAsync } from "../utilits/asyncHandler.utilis";
import { AppDataSource } from "../config/datasource.config";
import { User } from "../entities/User.entity";
import { Event } from "../entities/Event.entity";
import { Status } from "../types/status-enum";
import { bookingEventMail } from "../service/mail.service";
import CustomError from "../utilits/ApiError.utilis";

const eventRepo = AppDataSource.getRepository(Event);
const userRepo = AppDataSource.getRepository(User);

const registerEvent = wrapAsync(async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	const userDetails = await userRepo.find({ where: { uid: req.body.payload } });
	const eventDetails = await eventRepo.findOne({ where: { id } });
	const data = { ...eventDetails };
	data.user = userDetails;
	const status = await eventRepo.save(data);
	if (status) {
		res
			.status(Status.success)
			.json({ success: true, message: "Thank For Event Registration" });
		bookingEventMail(
			"confirmation-booking.mjml",
			userDetails[0].fullname,
			userDetails[0].email,
		);
	}
});

const showEvent = wrapAsync(async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	const data = await eventRepo.findOne({ where: { id } });
	if (!data) throw new CustomError(Status.bad_request, "Data not found");
	return res.status(Status.success).json({ data });
});

export { registerEvent, showEvent };
