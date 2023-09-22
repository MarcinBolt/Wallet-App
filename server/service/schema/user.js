import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Your first name is highly required'],
    },
    password: {
        type: String,
        required: [true, 'The password is very required'],
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
    },
    token: {
        type: String,
        default: null,
    },
    verificationToken: {
        type: String,
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model('user', userSchema);

export default User;
