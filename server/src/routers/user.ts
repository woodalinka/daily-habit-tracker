import express, {Response} from "express";
import {Request} from "../utils/customTypes";
import User, {iUserDocument as UserType} from "../models/user";
import auth from '../middleware/auth'

const router = express.Router()

router.post('/users', async (req: Request, res: Response) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken();
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req: Request, res: Response) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users/me', auth, async (req: Request, res: Response) => {
    res.send(req.user)
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