import express from "express";
import { signup, login, logout, getProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post('/signup', signup as express.RequestHandler);
router.post('/login', login as express.RequestHandler);
// @ts-ignore
router.post('/logout', protectRoute, logout as express.RequestHandler);
// @ts-ignore
router.get("/profile", protectRoute, getProfile as express.RequestHandler);

export default router;