import mongoose, { InferSchemaType, Model, Schema, Types, models } from 'mongoose';

const NewsSchema = new Schema(
	{
		title: { type: String, required: true },
		link: { type: String, required: true },
	},
	{ timestamps: true, collection: 'news' },
);

type NewsType = InferSchemaType<typeof NewsSchema>;

type NewsTypeWithId = NewsType & {
	_id: Types.ObjectId;
};

const News: Model<NewsType> = models.News || mongoose.model('News', NewsSchema);

export type { NewsType, NewsTypeWithId };
export { News };
