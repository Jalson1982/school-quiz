import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    email: string;
}
export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).send({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        console.log(decoded);
        if (!decoded) {
            res.status(401).send({ message: 'Unauthorized' });
            return;
        }

        res.locals.email = decoded.email;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Unauthorized' });
    }
};
