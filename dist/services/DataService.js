"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataRouter = (0, express_1.Router)();
dataRouter.get('/', (req, res) => {
    res.send({ "message": 'Welcome to data part of this API' });
});
exports.default = dataRouter;
