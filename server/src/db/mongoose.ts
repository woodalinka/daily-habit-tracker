import * as mongoose from "mongoose";

const dbUrl = 'mongodb://127.0.0.1:27017/habits-api';
mongoose.connect(dbUrl);



// const createUser = async () => {
//     await connect('mongodb://127.0.0.1:27017/habits-api')
//
//     const me = new User({
//         name: 'Maria    ',
//         email: "NEDALINKA@gmail.com  ",
//         password: "Password   "
//     })
//
//     await me.save().then(() => {
//         console.log(me)
//     }).catch((error) => {
//         console.log("error", error)
//     })
// }

// createUser().catch(err => console.log(err))



// const createHabit = async () => {
//     await connect('mongodb://127.0.0.1:27017/habits-api')
//
//     const newHabit = new Habit({
//         description: "   Program Node.js",
//         occurrence: 7,
//         completion: false
//     })
//
//     await newHabit.save().then(() => {
//         console.log(newHabit)
//     }).catch((error) => {
//         console.log(error)
//     })
// }

// createHabit().catch(err => console.log(err))
