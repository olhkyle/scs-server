import type { ExpressRequest, ExpressResponse, MongoError } from '../../types/global';
import { User } from '../../models';

const getUsers = async (_request: ExpressRequest, response: ExpressResponse) => {
	try {
		const users = await User.find();
		console.log(users);
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
