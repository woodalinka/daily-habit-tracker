import {Response, NextFunction} from "express";
import {Request} from "../utils/customTypes";
import jwt from "jsonwebtoken";
import User, {iUserDocument} from "../models/user";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = jwt.verify(token, 'thisismynewcourse');

        if (typeof decoded === 'object' && decoded.hasOwnProperty('_id')) {
            const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
            if (!user) {
                throw new Error()
            }

            req.user = user
            next()
        }

    } catch (e) {
        res.status(401).send({error: "Please authenticate"})
    }
}

export default auth;