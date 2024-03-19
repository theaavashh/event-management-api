class CustomError extends Error {
	statusCode?: number;
	errors?: [] | string;
	success: boolean;

	constructor(
		statusCode: number,
		message: string = "Something went wrong",
		errors?: [] | string,
	) {
		super(message);
		console.log(this.message);
		this.statusCode = statusCode;
		this.success = statusCode < 400 ? true : false;
		if (errors) {
			this.errors = JSON.parse(errors as string);
		}

		Error.captureStackTrace(this, this.constructor);
	}
}

export default CustomError;
