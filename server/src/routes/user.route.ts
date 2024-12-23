import express from "express";
import { signup, login, logout, getProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import passport from 'passport';
import { generateToken } from '../utils/generateToken.js';
import { setCookie } from '../utils/setCookie.js';

const router = express.Router();

router.post('/signup', signup as express.RequestHandler);
router.post('/login', login as express.RequestHandler);
// @ts-ignore
router.post('/logout', protectRoute, logout as express.RequestHandler);
// @ts-ignore
router.get("/profile", protectRoute, getProfile as express.RequestHandler);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), 
(req, res) => {
    const user = req.user as any;

    const {accessToken} = generateToken({_id: user._id.toString(),
      username: user.username
    });

    setCookie(res, accessToken);
    res.redirect(process.env.CLIENT_URL + '/editor');
}
)

// GitHub OAuth routes
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as any;
    const { accessToken } = generateToken({
      _id: user._id.toString(),
      username: user.username,
    });

    setCookie(res, accessToken);
    res.redirect(process.env.CLIENT_URL + '/editor');
  }
);


export default router;