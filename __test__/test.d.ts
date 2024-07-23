import { Response } from "express";

export const mockRequest = {
	body: {
		fullname: "example",
		email: "example@demo.com",
		password: "fakepassword",
		address: "bhaktapur",
	},
} as IRegUsers;

export const mockResponse = {
	status: jest.fn((x) => x).mockReturnThis(),
	json: jest.fn(),
} as unknown as Response;

export const next = {} as unknown as NextFunction;

export const insertDetailsMock = {
	...mockRequest.body,
	role: "user",
	isVerified: false,
	refreshToken: null,
};
