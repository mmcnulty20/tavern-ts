import { Document, Model, ObjectId, Schema } from "mongoose";

interface UserProps {
    displayName: string
    username: string
    // color: number //implement after base auth
}

export interface UserWithPassword extends UserProps {
    password: string
}

export interface User extends Readonly<UserProps> {
    readonly _id: ObjectId
    password?: string
}

export interface UserDocument extends UserWithPassword, Document {
    // relations go here
}

export interface UserModel extends Model<UserDocument> {
    // full User Model functions (like find all, already has functions like create)
    // findInRoom(id: number): Promise<UserDocument>
}

export interface UserSchema extends Schema<UserDocument, UserModel> {}
// Also consider virtual for returning CSS string for color?


//Validation types

export interface userInput {
    username: string
    password: string
}

export interface validationErrorsObj extends Partial<userInput> {}

export interface validationOutput {
    errors: validationErrorsObj
    isValid: boolean
}

export interface signupInput extends userInput {
    displayName: string
    confirmPassword: string
}

export interface signupErrorsObj extends validationErrorsObj, Partial<signupInput> {}

export interface signupValidationOutput {
    errors: signupErrorsObj
    isValid: boolean
}
