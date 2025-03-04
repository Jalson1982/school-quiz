"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestion = exports.getQuestion = exports.getQuestions = void 0;
const __1 = require("../..");
const getQuestions = async (_, res) => {
    const question = {
        id: "1",
        text: "What is the capital of France?",
        optionA: "Paris",
        optionB: "London",
        optionC: "Berlin",
        optionD: "Madrid",
        correctOption: "A",
        responseTime: 10,
    };
    res.send({
        question,
    });
};
exports.getQuestions = getQuestions;
const getQuestion = async (req, res) => {
    const { id } = req.params;
    const question = await __1.prisma.question.findUnique({ where: { id } });
    res.send({
        question,
    });
};
exports.getQuestion = getQuestion;
const createQuestion = async (req, res) => {
    const { optionA, optionB, optionC, optionD, correctOption, responseTime, text } = req.body;
    const newQuestion = await __1.prisma.question.create({
        data: { optionA, optionB, optionC, optionD, correctOption, responseTime, text },
    });
    res.send({
        newQuestion,
    });
};
exports.createQuestion = createQuestion;
