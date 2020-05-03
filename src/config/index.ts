import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  SECRET_KEY: process.env.SECRET_KEY,
  MONGO_URL: process.env.MONGO_URL,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  ENCRYPTION_IV: process.env.ENCRYPTION_IV,
  EXPIRATION_TIME: process.env.EXPIRATION_TIME,
};

export default config;
