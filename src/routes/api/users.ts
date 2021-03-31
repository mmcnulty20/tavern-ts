import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

import { secretOrKey } from "../../config/keys";
import User from "../../models/User";
import validateSignupInput from "../../validations/signup";
import validateLoginInput from "../../validations/login";
import { signupInput, signupValidationOutput, userInput, User as UserType } from "../../backendTypes/dbTypes";

const router = Router();

// Index Route

router.get("/", (req, res) => {
    // Temp
    res.json({ msg: "User Index Route" })
})

// Current user
router.get("/current",
    passport.authenticate('jwt', { session: false }),
    ({ body: { user } }, res) => {
        const { id, username, displayName }: UserType = user
        res.json({ id, username, displayName });
    }
)


// Create new account
router.post("/signup", ({ body: { user } }, res) => {
    // set display name to username if no display name provided
    const userInput: signupInput = {...user, displayName: user.displayName || user.username }
    const { errors, isValid }: signupValidationOutput = validateSignupInput(userInput)
    // debugging
    console.log("Signup Errors:")
    console.log(errors)
    console.log("Signup Input:")
    console.log(userInput)

    // if the user does not pass any validations, 400 error and send validation errors
    if ( !isValid ) return res.status(400).json(errors)
    console.log("Valid User!")

    const newUser = new User(userInput)

    bcrypt.genSalt(10, ( genErr, salt ) => {
        bcrypt.hash( userInput.password, salt, ( err, hash ) => {
            if ( err ) throw err
            // set password to secure hashed pass instead of raw string
            newUser.password = hash
    
            // actually create user in db
            newUser.save()
                .then( (user) => {
                    // create webtoken for frontend authentication
                    const { id, username } = user
                    jwt.sign(
                        { id, username },
                        secretOrKey,
                        { expiresIn: 3600 },
                        // when web token created, send it as "token" to frontend predicated with "Bearer"
                        ( _, token ) => {
                            res.json({
                                success: true,
                                token: `Bearer ${ token }`
                            })
                        }
                    )
                }).catch( err => res.json(err.message) )
        } )


    })
})

export default router


// login existing user
router.post("/login", ({ body }, res) => {
    // ensure no other keys are being passed further
    const { username, password }:userInput = body
    const { errors, isValid } = validateLoginInput({ username, password })

    if ( !isValid ) return res.status(400).json(errors)

    User.findOne({ username })
        .then( user => {
            if ( !user ) return res.status(400).json({ username: `${ username } doesn't exist!` })

            bcrypt.compare( password, user.password )
                .then( isMatch => {
                    if ( isMatch ) {
                        const { id, username } = user
                        jwt.sign(
                            { id, username },
                            secretOrKey,
                            { expiresIn: 3600 },
                            ( _, token ) => {
                                res.json({
                                    success: true,
                                    token: `Bearer ${ token }`
                                })
                            }
                        )
                    } else return res.status(400).json({ password: `Invalid Password` })
                } )
        } )
})