"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const candidateRouter = (0, express_1.Router)();
candidateRouter.post("/voted");
candidateRouter.get("/");
exports.default = candidateRouter;
