
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import authRoutes from './routes/authRoutes'
import booksRoutes from './routes/booksRoutes'
import connectDB from './config/db'
import swagger from './config/swagger';

dotenv.config();

connectDB();

const app = express();

app.use('/api/covers', express.static('uploads/covers'));
app.use('/api/icons', express.static('uploads/icons'));

app.use(cors(corsConfig));

// Logging
app.use(morgan('dev'));

// Leer datos del formulario
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);



app.use('/api', swagger);

export default app