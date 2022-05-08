import mongoose from "mongoose";

const Schema = mongoose.Schema

const bookCategorySchema = new Schema({
    book: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Books"
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "categories"
    },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date, default: () => Date.now() },
})

bookCategorySchema.pre('updateOne', function () {
    this.updatedAt = Date.now()
})


export default mongoose.model('book_category', bookCategorySchema)