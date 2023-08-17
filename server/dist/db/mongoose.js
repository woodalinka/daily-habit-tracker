"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
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
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error('Too short. Minimum 6 characters');
            }
            if (value.toLowerCase().includes('password')) {
                throw new Error(`Can't use the word "password" in your password`);
            }
        }
    }
});
const User = (0, mongoose_1.model)('User', userSchema);
const createUser = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/habits-api');
    const me = new User({
        name: 'Maria    ',
        email: "NEDALINKA@gmail.com  ",
        password: "Password   "
    });
    yield me.save().then(() => {
        console.log(me);
    }).catch((error) => {
        console.log("error", error);
    });
});
createUser().catch(err => console.log(err));
const habitSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    occurrence: {
        type: Number,
        required: true
    },
    completion: {
        type: Boolean,
        default: false
    }
});
//
const Habit = (0, mongoose_1.model)('Habit', habitSchema);
const createHabit = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/habits-api');
    const newHabit = new Habit({
        description: "Program",
        occurrence: 7,
        completion: false
    });
    yield newHabit.save().then(() => {
        console.log(newHabit);
    }).catch((error) => {
        console.log(error);
    });
});
// createHabit().catch(err => console.log(err))
