import express, {Request, Response} from 'express'
import Habit, {Habit as HabitType} from "../models/habit";

const router = express.Router()

router.post('/habits', async (req: Request, res: Response) => {
    const habit = new Habit(req.body)

    try {
        await habit.save();
        res.send(habit)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/habits', async (req: Request, res: Response) => {
    try {
        const habits: HabitType[] = await Habit.find()
        res.send(habits)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/habits/:id', async (req: Request, res: Response) => {
    const _id = req.params.id

    try {
        const habit: HabitType | null = await Habit.findById(_id)
        if (!habit) {
            res.status(404).send()
        }

        res.send(habit)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/habits/:id', async(req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const availableUpdates = ['description', 'occurrence', 'completion'];
    const isUpdateValid = updates.every((update) => { return availableUpdates.includes(update)})

    if (!isUpdateValid) {
        return res.status(400).send({error: "Update is invalid"})
    }

    try {
        // const update = await Habit.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        const habitUpdate = await Habit.findById(req.params.id)

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

router.delete('/habits/:id', async (req: Request, res: Response) => {
    try {
        const habit = await Habit.findByIdAndDelete(req.params.id)

        if (!habit) {
            res.status(404).send()
        }

        res.send(habit)
    } catch(e) {
        res.status(500).send(e)
    }
})

export default router;