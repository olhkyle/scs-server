import mongoose from 'mongoose';
import { type NewsType, News } from '../../models';

const getNewsList = async (): Promise<NewsType[]> => {
	const newsList = await News.find();

	return newsList;
};

const addNews = async ({ title, link }: NewsType): Promise<NewsType> => {
	const newNews = await News.create({ title, link });

	return newNews;
};

const deleteNews = async ({ id }: { id: string }) => {
	console.log(id);
	return await News.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

export { getNewsList, addNews, deleteNews };
