import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		name: String,
		email: String,
		password: String,
		role: {
			type: String,
			default: "user",
		},
		deletedAt: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.softDelete = function () {
	this.deletedAt = new Date();

	return this.save();
};

const User = model("User", userSchema);

export default User;
