import path from 'path';

import express, {Request, Response} from 'express';

const app = express();
const publicDirectoryPath = path.join(__dirname, '../../client/build')

app.use(express.static(publicDirectoryPath));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})

app.listen(8080, () => {
    console.log("Server is up on port 8080")
})
