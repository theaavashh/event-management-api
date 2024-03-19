class ApiResponse {
	message: string;
	data?: string | object;
	success: string;
	statusCode: number;

	constructor(statusCode: number, message = "Success", data?: string | object) {
		this.statusCode = statusCode;
		this.success = statusCode < 300 ? "true" : "false";
		this.message = message;
		this.data = data;
	}
}

export { ApiResponse };
