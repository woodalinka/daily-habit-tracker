import {model, Schema, PopulatedDoc} from "mongoose";
import {ObjectId} from "mongodb";
import User from './user'

export interface Habit {
    description: {
        type: string,
        required: true,
        trim: true
    }
    occurrence: {
        type: number,
        required: true
    }
    completion: {
        type: boolean,
        default: false
    },
    owner: {
        type: ObjectId,
        required: boolean,
        ref: PopulatedDoc<typeof User>
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
    },
    owner: {
        type: ObjectId,
        required: true,
        ref: 'User'
    }
})

const Habit = model('Habit', habitSchema)

export default Habit;
