import { registerUser, userRepo } from "../src/controllers/user.controller";
import { ApiResponse } from "../src/utilits/ApiResponse.utilis";
import { Status } from "../src/types/status-enum";
import { insertDetailsMock, mockRequest, mockResponse, next } from "./test";

describe("user registration", () => {
	it("should register a user and send confirmation mail", () => {
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
});
