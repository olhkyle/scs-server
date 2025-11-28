import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		if (mongoose.connection.readyState !== 0) {
			console.log('Already Connected to DB');
			return;
		}

		await mongoose.connect(process.env.MONGODB_URI || '', {
			dbName: process.env.MONGODB_DB_NAME!,
		});
		console.log('Connected to DB');
	} catch (error) {
		console.log('Error happened to connect DB', error);
		throw new Error(String(error));
	}
};
