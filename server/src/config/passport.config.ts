import passport, { use } from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user: any, done) =>{
    done(null, user._id);
})

passport.deserializeUser(async (_id:string, done) =>{
    try {
        const user = await User.findById(_id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
})

// Google Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile, "profile");


                let user = await User.findOne({email: profile.emails?.[0].value});

                if(user){
                    return done(null, user);
                }

                // create new user if does not exist

                user = await User.create({
                    username: profile.displayName,
                    email: profile.emails?.[0].value,
                    googleId: profile.id
                })

                return done(null, user);
            } catch (error) {
                return done(error as Error, undefined);
            }
        }
    )
)

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            callbackURL: `${process.env.SERVER_URL}/api/auth/github/callback`
        },

        async (accessToken:string, refreshToken:string, profile:any, done:any) =>{
            try {
                console.log(profile, "profile");
                let user = await User.findOne({githubId: profile.id});

                if(user){
                    return done(null, user);
                }

                // crate new user if does not exist

                user = await User.create({
                    username: profile.username,
                    email: profile.emails?.[0].value,
                    githubId: profile.id
                })

                return done(null, user);
            } catch (error) {
                return done(error as Error, undefined);
            }
        }
    )
)

export default passport;
