import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback, VerifyCallback } from "passport-jwt";
import mongoose from "mongoose";
import User from "../models/User";
// const User = mongoose.model('User');
import { secretOrKey } from "./keys";
const options:StrategyOptions = {
    secretOrKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

// Include type for user

const strategyCallback: VerifyCallback = ({ id }: { id: number }, done) => {
    User.findById(id)
        .then(user => {
            console.log(user)
            if (user) {
                return done(null, user)
            }
            return done(null, false)
        },
            err => console.log(err)
        )
}

export default (passport: { use: (arg0: Strategy) => void; }) => {
    passport.use(new Strategy(options, strategyCallback ))
}