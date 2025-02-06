import { handler } from '../build/handler.js';
import express from 'express';

const assetsPath = './data/assets';

const app = express();
app.use(express.json());

// serve assets dynamically
app.use(express.static(assetsPath))

// let sveltekit handle everything
app.use(handler);

app.listen(3000, () => {
	console.log('listening on port 3000');
});
