import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const generateAccessAndRefresh = (payload: string, role: string) => {
	const accessToken = jwt.sign(
		{ payload, role },
		process.env.JWT_SECRET_KEY as string,
	);
	const refreshToken = jwt.sign(
		{ payload, role },
		process.env.JWT_SECRET_KEY as string,
	);

	return { accessToken, refreshToken };
};

const verifyToken = (req: Request, _: Response, next: NextFunction) => {
	const token = req.headers.authorization;
	const auth = token?.split(" ")[1];
	const data = jwt.decode(auth as string);
	if (data && typeof data == "object") {
		req.body.role = data.role;
		req.body.payload = data.payload;
		next();
	}
};

export { generateAccessAndRefresh, verifyToken };
