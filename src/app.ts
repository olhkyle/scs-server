import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import dns from 'dns';
import { AuthRouter, NewsRouter, UserRouter } from './router';
import { allowedOrigins } from './constants';
import { connectDB } from './lib/mongoose';

class Server {
	public app: express.Application;
	public port: number;

	constructor() {
		dotenv.config();
		dns.setDefaultResultOrder('ipv4first');

		const app: express.Application = express();

		this.app = app;
		this.port = Number(process.env.PORT) || 8080;
	}

	private setRoute() {
		const router = express.Router();

		this.app.use(AuthRouter);
		this.app.use(UserRouter);
		this.app.use(NewsRouter);

		this.app.use(
			router.get('/', (_, response) => {
				response.status(200).send({ message: '✅ Successfully connect SCS server' });
			}),
		);
	}

	private async setMiddleware() {
		this.app.use((req, _, next) => {
			console.log(`middleware * ${req.rawHeaders[1]}`);
			next();
		});

		this.app.use(cors({ origin: allowedOrigins, credentials: true }));

		this.app.use(express.static('public'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		this.app.use(cookieParser());

		await connectDB();

		this.setRoute();

		// Last 404 Middleare
		this.app.use((_, res, __) => {
			res.send({ error: '404 Not-Found Error' });
		});
	}

	public listen() {
		this.setMiddleware();
		this.app.listen(this.port, () => {
			console.log(`----- SCS - Spatial Context Strategy -----`);
			console.log(`----- ✅ Successfully Connected -----`);
			console.log(`----- Server listening on http://localhost:${this.port} -----`);
			console.log(`----------`);
		});
	}
}

const init = () => {
	const server = new Server();
	server.listen();
};

init();
