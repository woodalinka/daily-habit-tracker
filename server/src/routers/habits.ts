import express, { Response} from 'express';
import {Request} from '../utils/customTypes'
import Habit, {Habit as HabitType} from "../models/habit";
import auth from '../middleware/auth'

const router = express.Router()

router.post('/habits', auth, async (req: Request, res: Response) => {
    // const habit = new Habit(req.body)
    const habit = new Habit({
        ...req.body,
        owner: req.user!._id
    })

    try {
        await habit.save();
        res.status(201).send(habit)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/habits', auth, async (req: Request, res: Response) => {
    try {
        const habits: HabitType[] = await Habit.find({
            owner: req.user!._id
        })
        res.send(habits)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/habits/:id', auth, async (req: Request, res: Response) => {
    const _id = req.params.id

    try {
        const habit = await Habit.findOne({
            _id, owner: req.user!._id
        })

        if (!habit) {
            res.status(404).send()
        }

        res.send(habit)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/habits/:id', auth, async(req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const availableUpdates = ['description', 'occurrence', 'completion'];
    const isUpdateValid = updates.every((update) => { return availableUpdates.includes(update)})

    if (!isUpdateValid) {
        return res.status(400).send({error: "Update is invalid"})
    }

    try {
        // const update = await Habit.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        const habitUpdate = await Habit.findOne({_id: req.params.id, owner: req.user!._id})

        if (!habitUpdate) {
            return res.status(404).send()
        }

        updates.forEach((update: string) => (habitUpdate as any)[update] = req.body[update])
        await habitUpdate.save()

        res.send(habitUpdate);

    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/habits/:id', auth, async (req: Request, res: Response) => {
    try {
        const habit = await Habit.findOneAndDelete({_id: req.params.id, owner: req.user!._id})

        if (!habit) {
           return res.status(404).send()
        }

        res.send(habit)
    } catch(e) {
        res.status(500).send(e)
    }
})

export default router;