import Validator from "validator";

import { userInput, validationErrorsObj, validationOutput } from "../backendTypes/dbTypes";
import validText from "./validText"

const validateLoginInput = ({ username, password }:userInput):validationOutput => {
    const errors:validationErrorsObj = {}

    // Username Validations
    if ( Validator.isEmpty(validText(username)) ) {
        errors.username = "Username is required"
    }

    //Password Validations
    if (Validator.isEmpty(validText(password))) {
        errors.password = "Password is required"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

export default validateLoginInput