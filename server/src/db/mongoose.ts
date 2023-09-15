import * as mongoose from "mongoose";

const dbUrl = 'mongodb://127.0.0.1:27017/habits-api';
mongoose.connect(dbUrl);
