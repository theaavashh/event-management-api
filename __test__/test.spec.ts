import request from "supertest";
import { registerUser } from "../src/controllers/user.controller";
import app from "../src/app";


test("should check user registration",async()=>{
	const data={
		fullname:"demo",
		email:"demo@demo.com",
		password:"8181881",
		address:"bhaktapur",	
	};

	const response=await request(app).post("/user").send(data).expect(200);

	expect(response.body).toEqual({success:true});



});