import type { ExpressRequest, ExpressResponse, MongoError } from '../../types/global';
import { type NewsType } from '../../models';
import { NewsService } from '.';

const getNewsList = async (_request: ExpressRequest, response: ExpressResponse) => {
	try {
		const newsList = await NewsService.getNewsList();
		console.log(newsList);

		response.status(200).send({ data: newsList });
	} catch (error: unknown) {
		const e = error as MongoError;

		if (e.code === 11000) {
			// unique error
		}
		console.error('[ERROR] news', error);
		response.status(500).send({ auth: 'fail' });
	}
};

const addNews = async (request: ExpressRequest, response: ExpressResponse) => {
	try {
		const { title, link } = request.body as NewsType;

		console.log(title, link);
		const news = await NewsService.addNews({ title, link, createdAt: new Date(), updatedAt: new Date() });

		response.status(201).send({ data: news, message: 'Successfully add News' });
	} catch (error: unknown) {
		const e = error as MongoError;

		if (e.code === 11000) {
			// unique error
		}
		console.error('[ERROR] news', error);
		response.status(500).send({ auth: 'fail' });
	}
};

const deleteNews = async (request: ExpressRequest, response: ExpressResponse) => {
	const { id } = request.params;
	console.log(id);
	if (!id) {
		return response.status(401);
	}

	try {
		const result = await NewsService.deleteNews({ id });
		console.log(result);
		console.log('[DELETE]', result);
		response.status(200).send({ message: 'Successfully delete one' });
	} catch (error) {
		console.error(error);
		response.status(500).send({ auth: 'fail' });
	}
};

export { getNewsList, addNews, deleteNews };
