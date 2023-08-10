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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var connectionURL = 'mongodb://127.0.0.1:27017';
var databaseName = "habits";
var client = new mongodb_1.MongoClient(connectionURL);
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
var updateData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var database, habits, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                console.log("we are in");
                database = client.db(databaseName);
                habits = database.collection('habits');
                return [4 /*yield*/, habits.updateOne({ _id: new mongodb_1.ObjectId("64d0f818b9044d6bf784a909") }, { $set: {
                            name: "Workout"
                        }
                    })];
            case 2:
                result = _a.sent();
                console.log("".concat(result.matchedCount, " document(s) matched the filter, updated ").concat(result.modifiedCount, " document(s)"));
                return [2 /*return*/];
        }
    });
}); };
updateData().catch(console.dir);
// async function insertData(db: Db):Promise<void> {
//     try{
//         const result = await db.collection('habits').insertOne({
//             name: 'Drink Water',
//             occurrence: 2
//         })
//         console.log(result.insertedId)
//     } catch(error) {
//         console.log(error, "Failed to insert entry")
//     }
// }
// async function main() {
//     const db = await connectToDatabase();
//     if (db) {
//         await insertData(db)
//     }
// }
