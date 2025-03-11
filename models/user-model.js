import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    deletedAt: {
        type: Date,
        default: null
    }
},
{
    timestamps: true
});

userSchema.methods.softDelete = function () {
    this.deletedAt = Date.now;

    return this.save();
}

const User = mongoose.model("User", userSchema)

export default User;
