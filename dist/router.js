"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService_1 = __importDefault(require("./services/UserService"));
const DataService_1 = __importDefault(require("./services/DataService"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send({ 'message': 'Hello World !' });
});
router.use('/user', UserService_1.default);
router.use('/data', DataService_1.default);
exports.default = router;
