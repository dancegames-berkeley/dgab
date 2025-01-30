import { handler } from '../build/handler.js';
import fs from 'fs';
import express from 'express';

const assetsPath = './data/assets';

const app = express();

// serve assets dynamically
app.use(express.static(assetsPath))

// let sveltekit handle everything
app.use(handler);

app.listen(3000, () => {
	console.log('listening on port 3000');
});