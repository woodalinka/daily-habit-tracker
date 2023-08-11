"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const publicDirectoryPath = path_1.default.join(__dirname, '../../client/build');
app.use(express_1.default.static(publicDirectoryPath));
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(8080, () => {
    console.log("Server is up on port 8080");
});
