import mongoose from "mongoose";
import passwordGenerator, { comparePassword } from "~/helpers/passwordGenerator";
import { generateRefreshToken, generateToken } from "~/helpers/generateToken";

const Schema = mongoose.Schema



const UserSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: { type: String, required: true },
    coins: { type: Number, default: 1200 },
    refreshToken: { type: String },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date, default: () => Date.now() },
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




export default mongoose.model('Users', UserSchema)