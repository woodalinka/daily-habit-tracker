"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routers/user"));
const habits_1 = __importDefault(require("./routers/habits"));
require('./db/mongoose');
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const publicDirectoryPath = path_1.default.join(__dirname, '../../client/build');
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
app.use(express_1.default.static(publicDirectoryPath));
app.use(express_1.default.json());
app.use(user_1.default);
app.use(habits_1.default);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(port, () => {
    console.log("Server is up on port " + port);
});
// import User from './models/user'
//
// const main = async () => {
//     // const habit = await Habit.findById('65083436fae6127541e16482')
//     // await habit!.populate('owner')
//     // console.log(habit!.owner)
//
//     const user = await User.findById('650832e9c584ab07ecd7b8a3')
//     await user!.populate('habits')
//     console.log(user!.habits)
// }
//
// main()
