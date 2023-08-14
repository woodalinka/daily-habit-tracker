"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/habits-api');
const userSchema = new mongoose_1.default.Schema({
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
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    }
});
const User = mongoose_1.default.model('User', userSchema);
const habitSchema = new mongoose_1.default.Schema({
    name: String,
    occurrence: Number
});
const Habit = mongoose_1.default.model('Habit', habitSchema);
const me = new User({
    name: 'Alina    ',
    email: "NEDALINKA@gmail.com  "
});
me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log("error", error);
});
const habit = new Habit({
    name: 'Program Everyday',
    occurrence: "never"
});
// habit.save().then(() => {
//     console.log(habit)
// }).catch((error) => {
//     console.log("error", error)
// })
