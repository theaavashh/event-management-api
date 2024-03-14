import "dotenv/config";
import { DataSource } from "typeorm";
import { Event } from "../entities/Event.entity";
import { User } from "../entities/User.entity";
import { Event_Registration } from "../entities/EventRegistration.entity";

const AppDataSource = new DataSource({
	type: "postgres",
	url: process.env.DB_URI,
	synchronize: true,
	entities: [Event,User,Event_Registration],
	logging:true

});

const dbConfig = async () => {
	try {
		await AppDataSource.initialize();
		console.log("Initialized the appdatasource");
	} catch (e) {
		console.log(e);
		return Promise.reject("Failed to initalized");
	}
};

export default dbConfig;
export {AppDataSource};
