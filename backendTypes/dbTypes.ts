import { Document, Model, Schema } from "mongoose";

export interface User {
    displayName: string
    username: string
    password: string
    // color: number //implement after base auth
}

export interface UserDocument extends User, Document {
    // relations go here
}

export interface UserModel extends Model<UserDocument> {
    // full User Model functions (like find all, already has functions like create)
    // findInRoom(id: number): Promise<UserDocument>
}

export interface UserSchema extends Schema<UserDocument, UserModel> {}
// Also consider virtual for returning CSS string for color?
