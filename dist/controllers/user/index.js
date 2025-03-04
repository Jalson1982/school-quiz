"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUser = exports.login = exports.addNewUser = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const __1 = require("../..");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userEmail) => {
    return jsonwebtoken_1.default.sign({ email: userEmail }, process.env.TOKEN_SECRET ?? "", {
        expiresIn: "24h",
    });
};
const getUsers = async (_, res) => {
    const users = await __1.prisma.user.findMany();
    res.send({
        users,
    });
};
exports.getUsers = getUsers;
const addNewUser = async (req, res) => {
    try {
        const { email, password, username, firstName, lastName } = req.body;
        console.log(req.body);
        if (!email || !password || !username) {
            res
                .status(400)
                .json({ message: "Email, username, and password are required" });
            return;
        }
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        console.log(email, password, username, hashedPassword);
        const existingUser = await __1.prisma.user.findUnique({ where: { email } });
        console.log(existingUser);
        const existingUsername = await __1.prisma.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            res.status(400).json({ message: "Email is already in use" });
            return;
        }
        if (existingUsername) {
            res.status(400).json({ message: "Username is already in use" });
            return;
        }
        const token = generateToken(email);
        const user = await __1.prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });
        const { password: _, ...userWithoutPassword } = user;
        res.json({
            user: {
                ...userWithoutPassword,
                token,
            },
        });
    }
    catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.addNewUser = addNewUser;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({
            message: "Email and password are required",
        });
        return;
    }
    const user = await __1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        res.status(400).send({
            message: "Invalid email or password",
        });
        return;
    }
    const isPasswordValid = bcryptjs_1.default.compareSync(password, user.password);
    if (!isPasswordValid) {
        res.status(400).send({
            message: "Invalid email or password",
        });
        return;
    }
    const token = generateToken(email);
    const { password: _, ...userWithoutPassword } = user;
    res.send({
        user: {
            ...userWithoutPassword,
            token,
        },
    });
};
exports.login = login;
const getUser = async (_, res) => {
    const email = res.locals.email;
    const user = await __1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        res.status(404).send({
            message: "User not found",
        });
        return;
    }
    const userDetails = await __1.prisma.user.findUnique({
        where: { email },
    });
    if (!userDetails) {
        res.status(404).send({
            message: "User details not found",
        });
        return;
    }
    const { password: hashedPassword, ...userWithoutPassword } = userDetails;
    res.send({
        user: userWithoutPassword,
    });
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    const email = res.locals.email;
    const { firstName, lastName } = req.body;
    const user = await __1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        res.status(404).send({
            message: "User not found",
        });
        return;
    }
    const updatedUser = await __1.prisma.user.update({
        where: {
            email,
        },
        data: {
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
        },
    });
    res.send({
        user: updatedUser,
    });
};
exports.updateUser = updateUser;
