import { Request } from "express";
import { User } from "./dbTypes";

export interface UserRequest extends Request {
    user?: User
}