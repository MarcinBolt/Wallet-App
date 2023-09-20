import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema;

const userSchema = new Schema({
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

userSchema.methods.setPassword = (password) => {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};
userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', userSchema);

export default User;