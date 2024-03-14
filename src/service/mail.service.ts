import nodemailer from "nodemailer";
import mjml2html from "mjml";
import fs from "node:fs/promises";
import path from "node:path";
import {compile} from "handlebars";


const sendingMail=async()=>{
	const filepath=path.join(__dirname,"..","views","confirmation-mail.mjml");
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
	const template=temps({name:"aavashh"});
	const {html}=mjml2html(template);


	const mailOption={
		from:process.env.ACCESS_EMAIL as string,
		to: "thataavashhganesh0@gmail.com",
		subject: "Mail send",
		html,
		
	};

	const status=await transporter.sendMail(mailOption);
	status.accepted? console.log("Mail Send"):console.log("Failed to send");
};

export {sendingMail};

