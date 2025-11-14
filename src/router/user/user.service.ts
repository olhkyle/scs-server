import prisma from '../../lib/prismaClient';
import type { ExpressRequest, ExpressResponse } from '../../types/global';

const getUsers = async (request: ExpressRequest, response: ExpressResponse) => {
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
