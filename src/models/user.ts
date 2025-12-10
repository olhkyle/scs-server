import mongoose, { InferSchemaType, Model, Schema, Types, models } from 'mongoose';

const SkillsSchema = new Schema(
	{
		school: { type: Boolean, default: false },
		work: { type: Boolean, default: false },
		certificate: { type: Boolean, default: false },
		autocad: { type: Boolean, default: false },
		autocad_drawing: { type: Boolean, default: false },
		modeling: { type: Boolean, default: false },
	},
	{ _id: false }, // 별도 _id 생성하지 않도록
);

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		course: { type: String, required: true },
		skills: {
			type: SkillsSchema,
			default: {},
		},
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
