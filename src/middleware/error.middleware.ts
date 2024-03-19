import { Request, Response, NextFunction } from "express";
import CustomError from "../utilits/ApiError.utilis";

const errorHandler = (
	err: CustomError,
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!(err instanceof CustomError)) {
		const statusCode = 500;
		const message = "Something went wrong";
		err = new CustomError(statusCode, message);
	}
	const response = {
		...err,
		error: err.message,
	};
	return res.status(err.statusCode as number).json(response);
	next();
};

export { errorHandler };
