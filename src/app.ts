/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";

import eventRoutes from "./routes/event.routes";
import userRoutes from "./routes/user.routes";
import path from "node:path";
import { readFileSync } from "node:fs";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
const yamlFile = readFileSync(path.resolve(__dirname, "swagger.yaml"), "utf-8");
const swaggerDocs = YAML.parse(yamlFile);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//endpoint for all routes
app.use("/api/v1", eventRoutes);
app.use("/api/v1", userRoutes);

//API Docs
//keeping swagger at end so that on "/" endpoint get load
app.use(
	"/",
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocs, {
		customSiteTitle: "FreeAPI docs",
	}),
);

//error middleware
app.use(errorHandler);

export default app;
