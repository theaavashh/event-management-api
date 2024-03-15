import express from "express";
import "reflect-metadata";

import eventRoutes from "./routes/event.routes";
import userRoutes from "./routes/user.routes";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use("/api/v1",eventRoutes);
app.use("/api/v1",userRoutes);



app.use((err:Error)=>{
	console.log(err.stack);
});




export default app;
