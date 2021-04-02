import { ObjectId } from "mongoose";
import { User as UserType } from "./backendTypes/dbTypes";

declare global {
    namespace Express {
        interface User extends UserType {}
    }
}