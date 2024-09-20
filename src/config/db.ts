import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import colors from "colors";

dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    dialect: 'mysql',
    models: [__dirname + '/../models/**/*'],
    logging: false
    //logging: console.log,
})

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()        
        console.log(colors.cyan.bold(` MySQL is connected at: ${process.env.DATABASE_URL}`));
        console.log(colors.green.bold('==============================='));
    } catch (error) {
        console.error(colors.bgRed.white(' Error connecting to the database:'), error);
    }
}

export default connectDB