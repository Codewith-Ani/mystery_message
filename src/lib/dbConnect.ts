import mongoose from 'mongoose';

type ConnectionObject = {
	isConnected?: number;
};

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
	if (connection.isConnected) {
		console.log('Already Connected to Database');
		return;
	}

	try {
		const db = await mongoose.connect(process.env.MONGODB_URI || '');
		console.log(db);

		connection.isConnected = db.connections[0].readyState;

		console.log('Database connected successfully');
	} catch (err) {
		console.log('Database connection failed', err);
		process.exit();
	}
};

export default dbConnect;
