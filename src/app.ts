import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { AuthRouter, UserRouter } from './router';

class Server {
	public app: express.Application;
	public port: number;

	constructor() {
		const app: express.Application = express();

		this.app = app;
		this.port = Number(process.env.PORT) || 8000;

		dotenv.config();
	}

	private setRoute() {
		this.app.use(AuthRouter);
		this.app.use(UserRouter);
	}

	private setMiddleware() {
		this.app.use((req, _, next) => {
			console.log(`middleware * ${req.rawHeaders[1]}`);
			next();
		});

		this.app.use(cors({ origin: process.env.CLIENT_SIDE_DEV_URL, credentials: true }));

		this.app.use(express.static('public'));
		this.app.use(express.json());
		this.app.use(cookieParser());

		this.setRoute();

		// Last 404 Middleare
		this.app.use((_, res, __) => {
			console.log('this is 404 ERROR middleware');
			res.send({ error: '404 Not-Found Error' });
		});
	}

	public listen() {
		this.setMiddleware();
		this.app.listen(this.port, () => {
			console.log(`server listening on http://localhost:${this.port}`);
		});
	}
}

const init = () => {
	const server = new Server();
	server.listen();
};

init();
