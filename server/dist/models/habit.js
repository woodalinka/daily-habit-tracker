"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const habitSchema = new mongoose_1.Schema({
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
        type: mongodb_1.ObjectId,
        required: true,
        ref: 'User'
    },
    completionDates: {
        type: Array
    }
});
const Habit = (0, mongoose_1.model)('Habit', habitSchema);
exports.default = Habit;
