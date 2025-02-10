import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  database_url: process.env.DATABASE_URL,
  bycrpt_salt: process.env.BCRYPT_SALT,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

  reset_paasword_url_link: process.env.RESET_PASSWORD_URL_LINK,

  //Cloudinary
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
};
