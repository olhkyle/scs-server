import mongoose from 'mongoose';

// sustain mongodb pool connection on Vercel / Serverless
type MongooseCache = {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
};

const globalCache = globalThis as typeof globalThis & { mongoose?: MongooseCache };
if (!globalCache.mongoose) {
	globalCache.mongoose = { conn: null, promise: null };
}

const cached = globalCache.mongoose;

export const connectDB = async () => {
	if (cached.conn) {
		if (globalCache.mongoose?.conn?.connection.readyState) {
			console.log('Already Connected to DB');
			return cached.conn;
		}
	}

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(process.env.MONGODB_URI!, {
				dbName: process.env.MONGODB_DB_NAME!,
				maxPoolSize: 20,
				minPoolSize: 5, // 중요
			})
			.then(m => m)
			.catch(error => {
				console.log('Error happened to connect DB', error);
				throw new Error(String(error));
			});

		console.log('Connected To DB');
	}

	cached.conn = await cached.promise;
	return cached.conn;
};
