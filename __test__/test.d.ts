import { Response } from "express";

export const mockRequest = {
	body: {
		fullname: "example",
		email: "example@demo.com",
	},
} as IRegUsers;

export const mockResponse = {
	status: jest.fn((x) => x).mockReturnThis(),
	json: jest.fn(),
} as unknown as Response;

export const next = {} as unknown as NextFunction;

export const insertDetailsMock = {
	fullname: "aavashh",
	uid: "1",
	address: "ajaja",
	email: "jajajja",
	password: "ajajja",
	role: "user",
	isVerified: false,
	refreshToken: "jajjajaja",
};
