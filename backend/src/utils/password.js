import bcrypt from "bcrypt";
import "dotenv/config";

const salt = Number(process.env.BCRYPT_SALT_ROUNDS);

export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, salt);
};

export const comparePassword = async (plainPassword, passwordHash) => {
  return await bcrypt.compare(plainPassword, passwordHash);
};
