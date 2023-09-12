import express, {Request, Response} from "express";
import User, {User as UserType} from "../models/user";

const router = express.Router()

router.post('/users', async (req: Request, res: Response) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users: UserType[] = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req: Request, res: Response) => {
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

router.patch('/users/:id', async(req: Request, res: Response) => {
    const updates: string[] = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {

        const user  = await User.findById(req.params.id)

        if(!user) {
            return res.status(404).send()
        }

        updates.forEach((update: string) => (user as any)[update] = req.body[update])
        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})



        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
})


export default router;