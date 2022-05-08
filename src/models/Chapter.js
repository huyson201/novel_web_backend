import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const chapterSchema = new Schema({
    number: {
        type: Number,
        required: true,
        index: { unique: true }
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "Books"
    },
    views: {
        type: Number,
        default: 0
    },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date, default: () => Date.now() },
})
chapterSchema.plugin(mongoosePaginate)
chapterSchema.pre('updateOne', function () {
    this.updatedAt = Date.now()
})


export default mongoose.model('Chapters', chapterSchema)