import mongoose from 'mongoose';

export const connectDB = async () => {
	const maxRetries = 5;
	let retries = 0;

	while (retries < maxRetries) {
		try {
			if (mongoose.connection.readyState === 1) {
				console.log('✅ Already connected to DB');
				return;
			}

			await mongoose.connect(process.env.MONGODB_URI || '', {
				dbName: process.env.MONGODB_DB_NAME!,
			});

			console.log('✅ Connected to DB');
			return;
		} catch (error) {
			retries++;
			console.log(`⚠️ DB connection failed. Retry ${retries}/${maxRetries}`);
			console.log('Error:', error);

			if (retries >= maxRetries) {
				console.error('❌ Could not connect to DB after multiple retries');
				throw new Error(String(error));
			}

			// 2초 대기 후 재시도
			await new Promise(resolve => setTimeout(resolve, 2000));
		}
	}
};
