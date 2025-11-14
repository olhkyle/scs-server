import express from 'express';
import { prisma } from '../../lib/db';

const getUsers = async (request: express.Request, response: express.Response) => {
	try {
		console.log(request.baseUrl);
		const users = await prisma.users.findMany({
			take: 10,
		});

		response.status(200).send({ data: users });
	} catch (error) {
		console.error('[ERROR] users', error);
		response.send(401).send({ auth: 'fail' });
	}
};

export { getUsers };
