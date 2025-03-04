"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./routes/index");
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const leaderboard_1 = require("./routes/leaderboard");
const question_1 = require("./routes/question");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
// Enable CORS for all origins (or specify allowed origins)
app.use((0, cors_1.default)({
    origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5505', 'http://127.0.0.1:5501'],
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
async function main() {
    app.get('/', (_, res) => {
        res.send({ message: 'Hello I am very healthy today :)' });
    });
    const routes = [index_1.userRouter, leaderboard_1.leaderboardRouter, question_1.questionRouter];
    routes.forEach((router) => {
        app.use(router);
    });
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await exports.prisma.$disconnect();
});
