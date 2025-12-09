import mongoose from 'mongoose';
import { type UserType, User } from '../../models';

const getUsers = async (): Promise<UserType[]> => {
	const users = await User.find();

	return users;
};

const addUser = async ({ name, email, course, skills }: UserType): Promise<UserType> => {
	const newUser = await User.create({ name, email, course, skills });

	return newUser;
};

const deleteUser = async ({ id }: { id: string }) => {
	console.log(id);
	return await User.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

export { getUsers, addUser, deleteUser };
