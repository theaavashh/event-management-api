import { loginUser, registerUser, userRepo } from "../src/controllers/user.controller";
import { ApiResponse } from "../src/utilits/ApiResponse.utilis";
import { Status } from "../src/types/status-enum";
import { insertDetailsMock, mockRequest, mockResponse, next } from "./test";
import { generateAccessAndRefresh } from "../src/service/jwt.service";

jest.mock("../src/service/jwt.service");

describe("user registration", () => {
	test("should register a user and send confirmation mail", () => {
		jest.spyOn(userRepo, "create").mockReturnValue(insertDetailsMock);
		jest.spyOn(userRepo, "save").mockResolvedValue(insertDetailsMock);

		registerUser(mockRequest, mockResponse, next);

		expect(userRepo.create).toHaveBeenCalledWith(mockRequest.body);
		expect(userRepo.save).toHaveBeenCalledWith(insertDetailsMock);

		expect(mockRequest.json).toHaveBeenCalledWith(
			new ApiResponse(Status.success, "User Registration Success", {
				fullname: "ahaha",
				email: "ahaha",
				address: "ahaha",
				role: "ahaha",
				isVerified: "ahaha",
			}),
		);
	});

	test("should login a user and provide access and refres token", () => {
		let mockLoginReq;
		let mockLoginRes;
		beforeEach(() => {
			mockLoginReq = {
				body: {
					email: "examplecom",
					password: "password123",
				},
			} as unknown as Request;

			const mockLoginRes = {
				status: jest.fn().mockReturnThis(),
				cookie: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
		});

		const findUserMock = {
			uid: "3",
			role: "user",
			isVerified: true,
			password: "encryptedPassword",
			refreshToken: null,
		};
		
		loginUser(mockLoginReq,mockLoginRes, next)
		expect(userRepo.findOne).toHaveBeenCalledWith(findUserMock);
		generateAccessAndRefresh.to
		expect(mockLoginReq!.status).toHaveBeenCalledWith(200);
		expect(mockLoginRes!.cookie).toHaveBeenCalledWith(
			"accessToken",
			"access-token",
		);
		expect(mockLoginRes!.cookie).toHaveBeenCalledWith(
			"refreshToken",
			"refresh-token",
		);
		expect(mockLoginRes!.json).toHaveBeenCalledWith(
			new ApiResponse(Status.success, "Login Successfully", {
				
			);
	});
});
