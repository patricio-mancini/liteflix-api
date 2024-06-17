import express, { Application } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import path from 'path';
import fs from 'fs'; 
import passportConfig from './config/passport';
import env from './config/env';
import movieRoutes from './routes/movieRoutes';
import authRoutes from './routes/authRoutes';

const uploadDir = 'media';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app: Application = express();

const corsOptions = {
  origin: env.clientBaseUrl,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(session({
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: env.mongoURI,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60
  }),
  cookie: {
    sameSite: 'none',
    secure: true,
    domain: '.patriciomancini.net'
  }
}));

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

mongoose.connect(env.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.use('/media', express.static(path.join(__dirname, 'media')));
app.use('/auth', authRoutes);
app.use('/user', movieRoutes);

app.listen(env.port, () => console.log(`Server running on port ${env.port}`));
