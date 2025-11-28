import type { ExpressRequest, ExpressResponse, MongoError } from '../../types/global';
import { type UserType } from '../../models';
import { UserService } from '.';

const getUsers = async (_request: ExpressRequest, response: ExpressResponse) => {
	try {
		const users = await UserService.getUsers();
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

const addUser = async (request: ExpressRequest, response: ExpressResponse) => {
	try {
		const { name, email, course } = request.body as UserType;

		console.log(name, email, course);
		const newUser = await UserService.addUser({ name, email, course, createdAt: new Date(), updatedAt: new Date() });

		response.status(201).send({ data: newUser, message: 'Successfully add user' });
	} catch (error: unknown) {
		const e = error as MongoError;

		if (e.code === 11000) {
			// unique error
		}
		console.error('[ERROR] users', error);
		response.status(500).send({ auth: 'fail' });
	}
};

const deleteUser = async (request: ExpressRequest, response: ExpressResponse) => {
	const { id } = request.params;
	console.log(id);
	if (!id) {
		return response.status(401);
	}

	try {
		const result = await UserService.deleteUser({ id });
		console.log(result);
		console.log('[DELETE]', result);
		response.status(200).send({ message: 'Successfully delete one' });
	} catch (error) {
		console.error(error);
		response.status(500).send({ auth: 'fail' });
	}
};

export { getUsers, addUser, deleteUser };
