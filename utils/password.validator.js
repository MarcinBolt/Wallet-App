import bCrypt from 'bcryptjs';

const validatePassword = async (password, userHashedPasswordInDB) => {
  const isPasswordValid = await bCrypt.compare(password, userHashedPasswordInDB);
  return isPasswordValid;
};

export default validatePassword;