import path from 'path';

import express, {Request, Response} from 'express';

import userRouter from './routers/user'
import habitRouter from './routers/habits'

require('./db/mongoose')

const app = express();
const port = process.env.PORT || 8080
const publicDirectoryPath = path.join(__dirname, '../../client/build')

app.use(express.static(publicDirectoryPath));
app.use(express.json())

app.use(userRouter)
app.use(habitRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})


// import * as bcrypt from 'bcrypt';
//
// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)
//
//     console.log(password)
//     console.log(hashedPassword)
//
//     const isMatch = await bcrypt.compare('Red1234!', hashedPassword)
//     console.log(isMatch)
// }
//
// myFunction();