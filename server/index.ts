import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

// middleware and config
dotenv.config();

const app: Express = express();

// routes
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// start the Express server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});