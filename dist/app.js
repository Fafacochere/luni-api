"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const hostname = '0.0.0.0';
const port = (_a = process.env.NODE_PORT) !== null && _a !== void 0 ? _a : 80;
app.listen(port);
console.log(`Server start hostname ${hostname}:${port}`);
console.log('Hello console');
app.use(router_1.default);
