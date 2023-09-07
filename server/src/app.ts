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

app.post('/users', (req: Request, res: Response) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    }).catch((e: Error) => {
        res.status(400).send(e)
    })
})

app.get('/users', (req: Request, res: Response) => {
    User.find({}).then((users: UserType[]) => {
        res.send(users)
    }).catch((e: Error) => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req: Request, res: Response) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e: Error) => {
        res.status(500).send()
    })
})

app.post('/habits', (req: Request, res: Response) => {
    const habit = new Habit(req.body)
    habit.save().then(() => {
        res.send(habit)
    }).catch((e:Error) => {
        res.status(400).send(e)
    })
})

app.get('/habits', (req: Request, res: Response) => {
    Habit.find({}).then((habits: HabitType[]) => {
        res.send(habits)
    }).catch((e: Error) => {
        res.status(500).send(e)
    })
})

app.get('/habits/:id', (req: Request, res: Response) => {
    const _id = req.params.id

    Habit.findById(_id).then((habit) => {
        if (!habit) {
            return res.status(404).send()
        }

        res.send(habit)
    }).catch((e: Error) => {
        res.status(500).send(e)
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})
