import Validator from "validator";
import { signupErrorsObj, signupInput, signupValidationOutput } from "../backendTypes/dbTypes";
import validText from "./validText";

const validateSignupInput = (arg: signupInput): signupValidationOutput => {
    const errors: signupErrorsObj = {}
    Object.keys(arg).forEach( k => arg[k] = validText(arg[k]) )
    const { username, password, displayName, confirmPassword } = arg

    // Username validations
    if (Validator.isEmpty(username)) {
        errors.username = "Username is required"
    } else {
        if (!Validator.isLength(username, { min: 2, max: 15 })) {
            errors.username = "Username must be between 2 and 15 characters"
        }
        // Display Name Validations
        if (username !== displayName) {
            if (Validator.isEmpty(displayName)) {
                errors.displayName = "Display name is required"
            }
            if (!Validator.isLength(displayName, { min: 2, max: 15 })) {
                errors.displayName = "Display name must be between 2 and 15 characters"
            }
        }
    }
    // Password validations
    if (Validator.isEmpty(password)) {
        errors.password = "Password is required"
    } else {
        if (!Validator.isLength(password, { min: 6, max: 50 })) {
            errors.password = "Password must be between 6 and 50 characters"
        }
        if (Validator.isEmpty(confirmPassword)) {
            errors.confirmPassword = "Password confirmation required"
        } else {
            if (!Validator.equals(password, confirmPassword)) {
                errors.confirmPassword = "Passwords must match"
            }
        }
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}

export default validateSignupInput