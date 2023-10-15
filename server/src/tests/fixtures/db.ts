import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from '../../models/user'

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    email: 'alina@test.com',
    password: '1234567!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, `${process.env.JWT_SECRET}`)
    }]
}

const setupDatabase = async () => {
    console.log("Deleting users...");
    await User.deleteMany()
    console.log("Creating test user ...")
    await new User(userOne).save()
    console.log("Setup complete...")
}

export {
    userOneId,
    userOne,
    setupDatabase
}
