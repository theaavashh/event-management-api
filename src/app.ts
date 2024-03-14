import express from "express";
import "reflect-metadata";
import { Request,Response } from "express";

import eventRoutes from "./routes/event.routes";
import userRoutes from "./routes/user.routes";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use("/",eventRoutes);
app.use("/",userRoutes);


//app.use((err:Error,req:Request,res:Response)=>{
//	res.status(400).json({success:false,message:"Internal Server Error"});
//});




export default app;
