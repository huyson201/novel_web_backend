import mongoose from "mongoose";
import passwordGenerator, { comparePassword } from "~/helpers/passwordGenerator";
import validator from 'validator'
import { generateRefreshToken, generateToken } from "~/helpers/generateToken";

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const emailValidator = (v) => {
    return validator.isEmail(v)
}


const UserSchema = new Schema({
    name: {
        first: String,
        last: String,
    },
    email: {
        type: String,
        required: true,
        index: { unique: true },
        validate: [emailValidator, 'invalid email']
    },
    password: { type: String, required: true },
    coins: { type: Number, default: 1200 },
    refreshToken: { type: String },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date, default: () => Date.now() },
})

UserSchema.virtual('fullName').get(() => {
    return this.name.first + ' ' + this.name.last
})

UserSchema.pre('updateOne', function (next) {
    this.updatedAt = Date.now()
    next()
})

UserSchema.pre('save', function (next) {
    if (!this.isModified("password")) return next()
    let hash = passwordGenerator(this.password)
    this.password = hash
    next()
})

UserSchema.methods.comparePassword = comparePassword
UserSchema.methods.generateToken = function () {
    let token = generateToken({ _id: this._id, email: this.email })
    return token
}

UserSchema.methods.generateRefreshToken = function () {
    let token = generateRefreshToken({ _id: this._id, email: this.email })
    return token
}


UserSchema.methods.toJson = function () {

    return { _id: this._id, email: this.email, name: this.name, coins: this.coins, createdAt: this.createdAt, updatedAt: this.updatedAt }
}


export default mongoose.model('Users', UserSchema)