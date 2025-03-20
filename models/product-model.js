import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: String,
    imageSource: String,
    details: String,
    price: Schema.Types.Double,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedAt: {
        type: Date,
        default: null
    }
},
{
    timestamps: true
});

productSchema.methods.softDelete = function () {
    this.deletedAt = new Date();

    return this.save();
};

const Product = model("Product", productSchema);

export default Product;
