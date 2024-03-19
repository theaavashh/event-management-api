import "dotenv/config";
import { DataSource } from "typeorm";
import { Event } from "../entities/Event.entity";
import { User } from "../entities/User.entity";

const AppDataSource = new DataSource({
	type: "postgres",
	url: process.env.DB_URI,
	synchronize: true,
	entities: [User, Event],
	logging: true,
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
export { AppDataSource };
