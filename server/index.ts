import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app: Express = express();
app.use(cors());

// middleware and config
dotenv.config();
app.use(express.json());

// routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!' });
});
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));

// start the Express server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});