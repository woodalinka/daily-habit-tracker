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
const express_1 = __importDefault(require("express"));
const habit_1 = __importDefault(require("../models/habit"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/habits', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const habit = new Habit(req.body)
    const habit = new habit_1.default(Object.assign(Object.assign({}, req.body), { owner: req.user._id }));
    try {
        yield habit.save();
        res.status(201).send(habit);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.get('/habits', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habits = yield habit_1.default.find({
            owner: req.user._id
        });
        res.send(habits);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
router.get('/habits/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const habit = yield habit_1.default.findOne({
            _id, owner: req.user._id
        });
        if (!habit) {
            res.status(404).send();
        }
        res.send(habit);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
router.patch('/habits/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const availableUpdates = ['description', 'occurrence', 'completion'];
    const isUpdateValid = updates.every((update) => { return availableUpdates.includes(update); });
    if (!isUpdateValid) {
        return res.status(400).send({ error: "Update is invalid" });
    }
    try {
        // const update = await Habit.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        const habitUpdate = yield habit_1.default.findOne({ _id: req.params.id, owner: req.user._id });
        if (!habitUpdate) {
            return res.status(404).send();
        }
        updates.forEach((update) => habitUpdate[update] = req.body[update]);
        yield habitUpdate.save();
        res.send(habitUpdate);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
router.delete('/habits/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habit = yield habit_1.default.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!habit) {
            return res.status(404).send();
        }
        res.send(habit);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
exports.default = router;
