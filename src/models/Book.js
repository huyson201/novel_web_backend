import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import Chapter from "./Chapter";
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    bookCate: {
        type: mongoose.Types.ObjectId,
        ref: "book_category"
    },
    translator: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    author: {
        type: String,
        default: "Đang Cập nhật"
    },
    desc: String,
    recommend: Boolean,
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date, default: () => Date.now() },
})

bookSchema.plugin(mongoosePaginate)
bookSchema.pre('updateOne', function () {
    this.updatedAt = Date.now()
})

bookSchema.pre('save', function () {
    this.bookCate = this._id
})

bookSchema.virtual("categories").get(async function () {
    const bookCate = mongoose.model('book_category')
    let categories = await bookCate.find({ book: this._id }).populate('category').select('category -_id')
    categories = categories.map(value => {
        return value.category
    })
    return categories
}).set(async function (value) {
    const bookCate = mongoose.model('book_category')
    await bookCate.deleteMany({ book: this._id })

    let bookCates = value.map(cateId => {
        return { book: this._id, category: cateId }
    })

    return await bookCate.insertMany(bookCates)

})

bookSchema.methods.setCategories = async function (value) {
    const bookCate = mongoose.model('book_category')
    await bookCate.deleteMany({ book: this._id })

    let bookCates = value.map(cateId => {
        return { book: this._id, category: cateId }
    })

    return await bookCate.insertMany(bookCates)
}

bookSchema.methods.getChapters = async function (page = 1, limit = 10, select = '') {
    const chapterModel = mongoose.model('Chapters')
    let chapters = await chapterModel.paginate({ book: this._id }, {
        limit,
        page,
        sort: 'number',
        select: select !== '' && select
    })
    return chapters
}

bookSchema.methods.getChapter = async function (chapterNumber = 1) {
    const chapterModel = mongoose.model('Chapters')
    let chapter = await chapterModel.findOne({ book: this._id, number: chapterNumber })
    return chapter
}
bookSchema.set('toJSON', { getters: true, virtuals: true })
bookSchema.set('toObject', { getters: true, virtuals: true })

export default mongoose.model('Books', bookSchema)