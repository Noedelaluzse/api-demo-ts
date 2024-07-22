import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  ACCOUNTSID: get('ACCOUNTSID').required().asString(),
  AUTHTOKEN: get('AUTHTOKEN').required().asString(),
  VERIFYSID: get('VERIFYSID').required().asString(),
  CLOUDINARY_URL: get('CLOUDINARY_URL').required().asString(),
  OUTGOING_EMAIL: get('OUTGOING_EMAIL').required().asString(),
  EMAIL_PASSWORD: get('EMAIL_PASSWORD').required().asString(),
  SMTP_SERVER: get('SMTP_SERVER').required().asString(),
  OUTGOING_PORT: get('OUTGOING_PORT').required().asPortNumber(),
  MAILER_SERVICE: get('MAILER_SERVICE').asString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').asString(),
}