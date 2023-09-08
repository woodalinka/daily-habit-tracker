import {model, Schema} from "mongoose";

export interface Habit {
    description: {
        type: String,
        required: true,
        trim: true
    }
    occurrence: {
        type: Number,
        required: true
    }
    completion: {
        type: Boolean,
        default: false
    }
}

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

// const Habit = model('Habit', habitSchema)

export default model('Habit', habitSchema)
