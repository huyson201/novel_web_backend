import mongoose from "mongoose";

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        required: true,
        type: String
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date, default: () => Date.now() },
})

categorySchema.pre('updateOne', function () {
    this.updatedAt = Date.now()
})


export default mongoose.model('categories', categorySchema)