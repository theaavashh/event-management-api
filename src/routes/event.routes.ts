import { Router } from "express";

import upload from "../service/multer.service";
import { addEvent, listEvent } from "../controllers/event.controller";
//import { registerEvent, showEvent } from "../controllers/register.controller";
const eventRoutes=Router();

eventRoutes.route("/event").post(upload.single("thumbnail"),addEvent).get(listEvent);

//eventRoutes.route("/event/:id").post(registerEvent);
//eventRoutes.route("/event/show").get(showEvent);

export default eventRoutes;