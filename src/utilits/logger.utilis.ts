import { createLogger, transports, format } from "winston";
const { timestamp,combine,prettyPrint } = format;


const logger = createLogger({
	level: "info",
	format: combine(timestamp(),format.json(),	prettyPrint(),),
	defaultMeta: { service: "user-service" },
	transports: [
		new transports.File({ filename: "log/mailing.log" }),
	],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
	logger.add(new winston.transports.Console({
		format: winston.format.simple(),
	}));
}