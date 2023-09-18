import {Document, Model, model, Schema} from "mongoose";
import * as bcrypt from 'bcrypt';
import validator from "validator";
import jwt from 'jsonwebtoken';
import Habit from './habit';

export interface iUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    generateAuthToken(): Promise<string>,
    tokens: {token: string}[],
    getPublicProfile(): Promise<object>,
    habits?: typeof Habit[]
}


export interface iUserModel extends Model<iUserDocument> {
    findByCredentials(email: string, password: string): Promise<iUserDocument>
}

const userSchema = new Schema<iUserDocument>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true}
    }]
})

userSchema.virtual('habits', {
    ref: 'Habit',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email: string, password: string ) => {
    const user = await User.findOne({ email: email})

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('deleteOne', {document: true, query: false}, async function (next) {
    const user = this
    await Habit.deleteMany({owner: user._id})
    next()
})

const User = model<iUserDocument, iUserModel>('User', userSchema)
export default User;
