import { Request } from 'express';
import { PassportStatic } from 'passport';

import User from '../db-models/user';

const LocalStrategy = require('passport-local').Strategy;

export function setupSignUpStrategy(passport: PassportStatic): void {
  passport.use('sign-up', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //  Allows passing req and done as paramters, besides the username and the password: req.body is the user that was passed
  }, (req: Request, email: string, password: string, done) => {
    // When calling done: first parameter: error, second: user, third: additional info
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        const newUser = new User(req.body);
        newUser.save(err => {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      }

      if (user) {
        return done(null, false, 'Duplicate user');
      }
    });
  }));
}

export function setupLoginStrategy(passport: PassportStatic): void {
  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email: string, password: string, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, 'User not found');

      }

      if (user) {
        if (user.password !== password) {
          return done(null, false, 'Wrong password')
        }
        return done(null, user);
      }
    });
  }));
}
