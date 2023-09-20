import User from './schema/user.schema.js';

export const createUser = async (email, password, firstName, verificationToken) => await new User({ email, password, firstName, verificationToken }).save();

export const findUserById = async id => await User.findOne({ _id: id });

export const findUserByEmail = async email => await User.findOne({ email });

export const findUserByToken = async token => await User.findOne({ token });

export const updateUsersDataById = async (id, field) => await User.findByIdAndUpdate({ _id: id }, field, { new: true });

export const deleteUserById = async id => await User.deleteOne({ _id: id });
