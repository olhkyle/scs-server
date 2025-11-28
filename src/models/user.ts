import mongoose, { InferSchemaType, Model, Schema, Types, models } from 'mongoose';

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		course: { type: String, required: true },
	},
	{ timestamps: true, collection: 'users' },
);

type UserType = InferSchemaType<typeof UserSchema>;

type UserTypeWithId = UserType & {
	_id: Types.ObjectId;
};

const User: Model<UserType> = models.User || mongoose.model('User', UserSchema);

export type { UserType, UserTypeWithId };
export { User };
