import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());

app.use(session({
  secret: 'test_secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

interface GoogleProfile {
  id: string;
  displayName: string;
  emails?: { value: string }[];
  photos?: { value: string }[];
}



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "http://localhost:4000/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  console.log('Google 프로필:', profile); // 디버깅을 위해 프로필 정보 출력
  const userProfile = {
    googleId: profile.id,
    displayName: profile.displayName,
    email: profile.emails?.[0]?.value,
    photo: profile.photos?.[0]?.value,
    accessToken,
    refreshToken
  };
  return done(null, userProfile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  (req, res, next) => {
    passport.authenticate('google', (err: Error | null, user: Express.User | null, info: any) => {
      if (err) {
        console.error('Google 인증 에러:', err);
        return res.redirect('http://localhost:3000/login-error');
      }

      if (!user) {
        console.error('사용자 정보 없음:', info);
        return res.redirect('http://localhost:3000/login-error');
      }

      req.logIn(user, (err) => {
        if (err) {
          console.error('로그인 에러:', err);
          return res.redirect('http://localhost:3000/login-error');
        }
        const userDataString = encodeURIComponent(JSON.stringify(user));
        res.redirect(`http://localhost:3000/login-success?user=${userDataString}`);
      });
    })(req, res, next);
  }
);

app.get('/api/user', (req, res) => {
  res.json(req.user || null);
});

app.get('/api/logout', (req, res) => {
  req.logout(() => {
    res.json({ success: true });
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express Server!');
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});