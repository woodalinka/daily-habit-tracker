import {Schema, model, connect, Mongoose} from "mongoose";
import validator from "validator";
interface User {
    name: string;
    email: string;
    password: string
}

interface Habit {
    description: string,
    occurrence: number,
    completion: false
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
                throw new Error ('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,

    }
})

const User = model('User', userSchema);
const createUser = async () => {
    await connect('mongodb://127.0.0.1:27017/habits-api')

    const me = new User({
        name:'Alina    ',
        email: "NEDALINKA@gmail.com  "
    })

    await me.save().then(() =>{
        console.log(me)
    }).catch((error) => {
        console.log("error", error)
    })
}

createUser().catch(err => console.log(err))


// const habitSchema = new mongoose.Schema({
//     name: String,
//     occurrence: Number
// })
//
// const Habit = mongoose.model('Habit', habitSchema)

// const habit = new Habit ({
//     name: 'Program Everyday',
//     occurrence: "never"
// })

// habit.save().then(() => {
//     console.log(habit)
// }).catch((error) => {
//     console.log("error", error)
// })
