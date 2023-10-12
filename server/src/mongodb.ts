import {MongoClient, Db, ObjectId} from 'mongodb';

interface Habit {
    name: string
}

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName: string  = "habits";
const client = new MongoClient(connectionURL);
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

const updateData = async () => {
    await client.connect();
    console.log("we are in")
    const habits = database.collection<Habit>('habits')

    const result = await habits.updateOne(
        {_id: new ObjectId("64d0f818b9044d6bf784a909")},
        {$set: {
            name: "Workout"
            }
        }
    );
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`)
}

// updateData().catch(console.dir)

const insertEntry = async ()  =>  {
    await client.connect();
    console.log("We are in to enter the first entry")
    const habits = database.collection('habits')


    const result = await habits.insertOne({
            name: 'Drink Water',
            occurrence: 2
        })
        console.log(result.insertedId)
}

// insertEntry().catch(console.dir)


// async function main() {
//     const db = await connectToDatabase();
//     if (db) {
//         await insertData(db)
//     }
// }












