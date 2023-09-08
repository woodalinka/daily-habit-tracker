import path from 'path';

import express, {Request, Response} from 'express';
import User, {User as UserType} from './models/user';
import Habit, {Habit as HabitType} from './models/habit'

require('./db/mongoose')

const app = express();
const port = process.env.PORT || 8080
const publicDirectoryPath = path.join(__dirname, '../../client/build')

app.use(express.static(publicDirectoryPath));
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})

app.post('/users', async (req: Request, res: Response) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req: Request, res: Response) => {
    try {
        const users: UserType[] = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req: Request, res: Response) => {
    const _id = req.params.id

    try {
        const user: UserType | null = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/habits', async (req: Request, res: Response) => {
    const habit = new Habit(req.body)

    try {
        await habit.save();
        res.send(habit)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/habits', async (req: Request, res: Response) => {
    try {
        const habits: HabitType[] = await Habit.find()
        res.send(habits)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/habits/:id', async (req: Request, res: Response) => {
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

app.listen(port, () => {
    console.log("Server is up on port " + port)
})
