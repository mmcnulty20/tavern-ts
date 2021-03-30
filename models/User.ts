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


/*
Argument of type 
'(schema: Schema<Document<any, {}>, Model<any, any>, undefined>, options?: any) => void' 
is not assignable to parameter of type 
'(schema: Schema<UserDocument, Model<UserDocument, {}>, undefined>, opts?: any) => void'.
Types of parameters 'schema' and 'schema' are incompatible.


Type 
'Schema<UserDocument, Model<UserDocument, {}>, undefined>' 
is not assignable to type 
'Schema<Document<any, {}>, Model<any, any>, undefined>'.

Types of property 'methods' are incompatible.

Type 
'{ [name: string]: (this: UserDocument, ...args: any[]) => any; }'
is not assignable to type 
'{ [name: string]: (this: Document<any, {}>, ...args: any[]) => any; }'.
Index signatures are incompatible.
    
Type 
'(this: UserDocument, ...args: any[]) => any'
is not assignable to type 
'(this: Document<any, {}>, ...args: any[]) => any'.
        
The 'this' types of each signature are incompatible.
Type 'Document<any, {}>' is not assignable to type 'UserDocument'.ts(

*/