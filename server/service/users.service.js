import User from './schema/user.schema.js';

export const createUserInDB = async (email, password, firstName, verificationToken) =>
  await new User({ email, password, firstName, verificationToken }).save();

export const findUserByIdInDB = async id => await User.findOne({ _id: id });

export const findUserByEmailInDB = async email => await User.findOne({ email });

export const findUserByTokenInDB = async token => await User.findOne({ token });

export const updateUserDataByIdInDB = async (id, field) =>
  await User.findByIdAndUpdate({ _id: id }, field, { new: true });

export const deleteUserByIdInDB = async id => await User.deleteOne({ _id: id });

export const findUserByVerificationTokenInDB = async verificationToken =>
  await User.findOne({ verificationToken });
