import { createLogger, transports, format } from "winston";
const { timestamp,combine,prettyPrint } = format;


const logger = createLogger({
	level: "info",
	format: combine(timestamp(),format.json(),	prettyPrint()),
	defaultMeta: { service: "user-service" },
	transports: [
		new transports.File({ filename: "log/mailing.log" }),
	],
});


export default logger;
