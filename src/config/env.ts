import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const config = {
  mongoURI: process.env.MONGODB_URL,
  port: process.env.PORT,
  clientBaseUrl: process.env.CLIENT_BASE_URL,
  sessionSecret: process.env.SESSION_SECRET,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackURL: process.env.GOOGLE_CALLBACK_URL
};

export default config;
