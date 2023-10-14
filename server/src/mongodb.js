"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = "habits";
const client = new mongodb_1.MongoClient(connectionURL);
const database = client.db(databaseName);
// const id = new ObjectId();
// console.log("let's see whats here", id)
// const connectToDatabase = async () => {
//     const client = await MongoClient.connect(connectionURL);
//     // return client.db(databaseName);
// }
//
// connectToDatabase().then(
//     () => {
//         console.log("Connected correctly!")
//     }
// ).catch((error) => {
//     console.log(error, "Connectivity issues")
// })
const updateData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    console.log("we are in");
    const habits = database.collection('habits');
    const result = yield habits.updateOne({ _id: new mongodb_1.ObjectId("64d0f818b9044d6bf784a909") }, { $set: {
            name: "Workout"
        }
    });
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
});
// updateData().catch(console.dir)
const insertEntry = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    console.log("We are in to enter the first entry");
    const habits = database.collection('habits');
    const result = yield habits.insertOne({
        name: 'Drink Water',
        occurrence: 2
    });
    console.log(result.insertedId);
});
// insertEntry().catch(console.dir)
// async function main() {
//     const db = await connectToDatabase();
//     if (db) {
//         await insertData(db)
//     }
// }
