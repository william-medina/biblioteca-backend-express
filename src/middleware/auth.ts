import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: User; 
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = new Error('Unauthorized');
        return res.status(401).json({ error: error.message });
    }

    const [, token] = bearer.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        const user = await User.findByPk(decoded.id, {
            attributes: ['id', 'email']
        });

        if (user) {
            req.user = user; 
            next();
        } else {
            const error = new Error('Unauthorized');
            res.status(401).json({ error: error.message });
        }
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};