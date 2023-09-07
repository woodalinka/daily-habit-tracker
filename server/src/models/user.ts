import {model, Schema} from "mongoose";
import validator from "validator";

export interface User {
    name: string;
    email: string;
    password: string
}

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value: string) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value: string) {
            if (value.length < 7) {
                throw new Error('Too short. Minimum 7 characters')
            }

            if (value.toLowerCase().includes('password')) {
                throw new Error(`Can't use the word "password" in your password`)
            }
        }
    }
})

const User = model('User', userSchema);

export default model('User', userSchema)