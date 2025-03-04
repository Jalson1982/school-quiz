"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).send({ message: 'Unauthorized' });
        return;
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        console.log(decoded);
        if (!decoded) {
            res.status(401).send({ message: 'Unauthorized' });
            return;
        }
        res.locals.email = decoded.email;
        next();
    }
    catch (error) {
        res.status(401).send({ message: 'Unauthorized' });
    }
};
exports.authMiddleware = authMiddleware;
