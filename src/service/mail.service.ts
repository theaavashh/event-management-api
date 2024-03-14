import nodemailer from "nodemailer";
import mjml2html from "mjml";
import fs from "node:fs/promises";
import path from "node:path";
import {compile} from "handlebars";
import logger from "../utilits/logger.utilis";
import { TUser } from "../types/event-types";


const sendingMail=async(paths:string,user:TUser)=>{

	const filepath=path.join(__dirname,"..","views",paths);
	const data=await fs.readFile(filepath,"utf-8");

	const transporter=nodemailer.createTransport({
		service:"gmail",
		host:"smtp.gmail.com",
		port:587,
		secure:false,
		auth:{
			user:process.env.ACCESS_EMAIL,
			pass:process.env.ACCESS_PASSWORD,
		}
	});

	const temps=compile(data);
	const template=temps({uid:user.uid,name:user.fullname});
	const {html}=mjml2html(template);


	const mailOption={
		from:process.env.ACCESS_EMAIL as string,
		to: user.email,
		subject: "Mail send",
		html,
		
	};

	const status=await transporter.sendMail(mailOption);
	status.accepted? logger.log("info","Mail Send for verification"):logger.log("info","Issue in send mail");
};

export {sendingMail};

