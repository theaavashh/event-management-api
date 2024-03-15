import { Router } from "express";

import upload from "../service/multer.service";
import { addEvent, listEvent } from "../controllers/event.controller";

import { eventValidation } from "../service/zod.validation";
import { registerEvent, showEvent } from "../controllers/register.controller";
import { verifyToken } from "../service/jwt.service";

const eventRoutes=Router();

eventRoutes.route("/event").post(upload.single("thumbnail"),eventValidation,verifyToken,addEvent).get(listEvent);

eventRoutes.route("/event/:id").post(verifyToken,registerEvent);
eventRoutes.route("/event/show").get(showEvent);

export default eventRoutes;