import path from 'path';

import express, {Request, Response} from 'express';

import userRouter from './routers/user'
import habitRouter from './routers/habits'

require('./db/mongoose')

const app = express();
const publicDirectoryPath = path.join(__dirname, '../../client/build')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // or the specific domain you want to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// app.use((req: Request, res: Response, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })
//
// app.use((req: Request, res: Response) => {
//         res.status(503).send('Website under maintenance')
// })

app.use(express.static(publicDirectoryPath));
app.use(express.json())
app.use(userRouter)
app.use(habitRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})

export default app
