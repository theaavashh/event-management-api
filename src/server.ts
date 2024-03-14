import app from "./app";
import "dotenv/config";
import { TPort } from "./types/server";
import dbConfig from "./config/datasource.config";

const Port: TPort = process.env.PORT || 443;

dbConfig()
	.then(() => {
		app.listen(Port, () => {
			console.log(`Server started at ${Port}`);
		});
	})
	.catch((e) => {
		console.log(e);
	});
