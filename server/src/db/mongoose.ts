import {Schema, model, connect} from "mongoose";
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
        trim: true,
        minlength: 7,
        validate(value: string) {
            if (value.length < 7) {
                throw new Error ('Too short. Minimum 7 characters')
            }

            if (value.toLowerCase().includes('password')){
                throw new Error (`Can't use the word "password" in your password`)
            }
        }
    }
})

const User = model('User', userSchema);
const createUser = async () => {
    await connect('mongodb://127.0.0.1:27017/habits-api')

    const me = new User({
        name:'Maria    ',
        email: "NEDALINKA@gmail.com  ",
        password: "Password   "
    })

    await me.save().then(() =>{
        console.log(me)
    }).catch((error) => {
        console.log("error", error)
    })
}

createUser().catch(err => console.log(err))


const habitSchema = new Schema<Habit>({
    description: {
        type: String,
        required: true,
        trim: true,

    },
    occurrence: {
        type: Number,
        required: true
    },
    completion: {
        type: Boolean,
        default: false
    }
})
//
const Habit = model('Habit', habitSchema)

const createHabit = async () => {
    await connect('mongodb://127.0.0.1:27017/habits-api')

    const newHabit = new Habit({
        description: "Program",
        occurrence: 7,
        completion: false
    })

    await newHabit.save().then(() => {
        console.log(newHabit)
    }).catch((error) => {
        console.log(error)
    })
}

// createHabit().catch(err => console.log(err))
