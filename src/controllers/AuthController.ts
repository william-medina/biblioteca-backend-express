import { Request, Response } from "express"
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/user";
import { generateJWT } from "../utils/jwt";

export class AuthController {
    
    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            
            const foundUser = await User.findOne({ where: { email } });
            if(!foundUser) {
                const error = new Error('Usuario no registrado');
                return res.status(404).json({error: error.message});
            }

            // Revisar password
            const isPasswordCorrect = await checkPassword(password, foundUser.dataValues.password);
            if(!isPasswordCorrect) {{
                const error = new Error('Password incorrecto');
                return res.status(401).json({error: error.message});
            }}

            const token = generateJWT(foundUser.id);

            res.send(token);
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    static getCurrentUser = async (req: Request, res: Response) => {
        return res.json(req.user);
    }

    static updatePassword = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            
            const user = await User.findOne({ where: { email } });
            if(!user) {
                const error = new Error('Usuario no registrado');
                return res.status(404).json({error: error.message});
            }

            const hashedPassword = await hashPassword(password);
      
            // Actualizar directamente en la base de datos
            await User.update({ password: hashedPassword }, {
                where: { email },
            });

            await user.save();
            
            res.send('Password cambiado exitosamente');
        } catch (error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
}
