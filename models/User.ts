import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { UserDocument, UserModel } from "../backendTypes/dbTypes";
//alter after adding additional functionality (especially search functions) to User model
const UserSchema = new Schema< UserDocument, UserModel >(
    {
        displayName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    }, {
        strict: true,
        timestamps: true,
    }
)

UserSchema.plugin(uniqueValidator);

export default model<UserDocument, UserModel>("User", UserSchema)