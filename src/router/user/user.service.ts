import type { ExpressRequest, ExpressResponse } from '../../types/global';
import { User } from '../../models';

interface MongoError extends Error {
	code?: number;
	keyPattern?: Record<string, unknown>;
	keyValue?: Record<string, unknown>;
}

const getUsers = async (_request: ExpressRequest, response: ExpressResponse) => {
	try {
		const users = await User.find();

		response.status(200).send({ data: users });
	} catch (error: unknown) {
		const e = error as MongoError;

		if (e.code === 11000) {
			// unique error
		}
		console.error('[ERROR] users', error);
		response.status(500).send({ auth: 'fail' });
	}
};

export { getUsers };
