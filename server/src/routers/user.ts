import express, {Response} from "express";
import {Request} from "../utils/customTypes";
import User from "../models/user";
import auth from '../middleware/auth'

const router = express.Router()

router.post('/users/signup', async (req: Request, res: Response) => {
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

router.post('/users/logout', auth, async (req: Request, res: Response) => {
    try {
        // if (req.user) {
            req.user!.tokens = req.user!.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user!.save()
        // }

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req: Request, res: Response) => {
    try {
        req.user!.tokens = []
        await req.user!.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req: Request, res: Response) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async(req: Request, res: Response) => {
    const updates: string[] = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        // const user  = await User.findById(req.user!._id)

        updates.forEach((update: string) => (req.user! as any)[update] = req.body[update])
        await req.user!.save()

        res.send(req.user!)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req: Request, res: Response) => {
    try {
        console.log("Delete route started")
        const user = await User.findById(req.user!._id)
        await user!.deleteOne()
        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
})

export default router;