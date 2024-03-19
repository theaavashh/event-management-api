import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/ban-types
const wrapAsync = (requestHandler: Function) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
	};
};

export { wrapAsync };
