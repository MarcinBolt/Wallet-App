const mongoose = require('mongoose');
const bCryptJS = require('bcryptjs');

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
});

userSchema.methods.setPassword = (password) => {
    this.password = bCryptJS.hashSync(password, bCryptJS.genSaltSync(9));
};
userSchema.methods.validPassword = (password) => {
    return bCryptJS.compareSync(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;