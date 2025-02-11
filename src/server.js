import { handler } from '../build/handler.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const assetsPath = './data/assets';

const app = express();
const corsOptions = {
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	allowedHeaders: '*',
	credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// serve assets dynamically
app.use(express.static(assetsPath))

// let sveltekit handle everything
app.use(handler);

app.listen(3000, () => {
	console.log('listening on port 3000');
});
