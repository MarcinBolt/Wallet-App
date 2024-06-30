import bCrypt from 'bcryptjs';

const hashPassword = async password => {
  const salt = await bCrypt.genSalt(10);
  const hash = await bCrypt.hash(password, salt);
  return hash;
};

export default hashPassword;