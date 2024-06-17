import { Router } from 'express';
import passport from 'passport';
import env from '../config/env';

const router: Router = Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: env.clientBaseUrl }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }
    res.cookie('userData', JSON.stringify(req.user), {
      sameSite: 'none',
      secure: true,
      domain: '.patriciomancini.net'
    });
    res.redirect(env.clientBaseUrl);
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Failed to logout');
    }
    res.clearCookie('userData', {
      domain: '.patriciomancini.net',
      secure: true,
      sameSite: 'none'
    });
    res.status(200).send('Logout Successfully');
  });
});

export default router;