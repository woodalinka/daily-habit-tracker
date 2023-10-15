import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from '../../models/user';
import Habit from '../../models/habit'

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    email: 'alina@test.com',
    password: '1234567!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, `${process.env.JWT_SECRET}`)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    email: 'alina@test2.com',
    password: '12345678!',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, `${process.env.JWT_SECRET}`)
    }]
}

const habitOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Drink Water from test suit',
    owner: userOneId
}

const habitTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Drink Water 2 from test',
    owner: userOneId
}

const habitThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Drink Water from test suit for second user',
    owner: userTwoId
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Habit.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Habit(habitOne).save()
    await new Habit(habitTwo).save()
    await new Habit(habitThree).save()
}

export {
    userOneId,
    userOne,
    userTwo,
    habitOne,
    setupDatabase
}
