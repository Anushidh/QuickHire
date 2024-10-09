import bcrypt from 'bcryptjs'


export const comparePasswords = async (enteredPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};