import express from "express";
import mongoose from "mongoose";
import passport from "passport"

import { mongoURI as db } from "./config/keys"
import passConfig from "./config/passport"

const app = express();

// Routes
import userRoutes from "./routes/api/users"

// Setup mongoose

mongoose
    .connect(db, { useNewUrlParser: true })
    .then( () => console.log("Successfully connected to MongoDB!") )
    .catch( err => { console.log("The following error occured while connecting to MongoDB:"); console.log(err) })

// Setup server

// Default server port to 5000 unless set by env
const port:number | string = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())

passConfig(passport)

// Root route will return base HTML with root element for React
app.get("/", (req, res) => res.send("Root Route"))

// Use configured routes
app.use("/api/users", userRoutes)


app.listen(
    port,
    () => console.log(`Server is listening on port ${ port }.`)
)