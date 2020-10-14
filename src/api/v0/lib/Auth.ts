'use strict';
require("dotenv").config();
import * as Boom from '@hapi/boom';
import * as Bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

let _models, _config;

export class Auth {
    constructor(models, config) {
        _models = models;
        _config = config;
    }

    async login(request) {
        const { email, password } = request.payload;
        let user;
        try {
            user = await _models.User.findOne({ email });
            if (!user) throw new Error('email or password incorrect');
            let trusted = await Bcrypt.compare(password || '', user.password);
            if (!trusted) throw new Error('email or password incorrect');
            return {
                token: jwt.sign({ _id: user._id }, _config.auth.secret.jwt, { expiresIn: '5d' }),
                user: user

            };
        } catch (err) {
            return Boom.forbidden(err);
        }
    }


    async signup(request) {
        let user = request.payload;
        let email = request.payload.email
        try {
            let unique = await _models.User.findOne({ email });
            if (unique) throw new Error('email already exists!');
            user.password = await Bcrypt.hash(user.password, 10);
            user = new _models.User(user);
            await user.save();
            return {

                token: jwt.sign({ _id: user._id }, _config.auth.secret.jwt, { expiresIn: '5d' }),
                _id: user._id, status: 'created', name: user.name
            };
        } catch (err) {
            return Boom.forbidden(err);
        }
    }

    async me(req) {
        try {
            const token = req.headers.authorization.replace('Bearer ', '')
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await _models.User.findOne({ _id: decoded._id })

            if (!user) {
                throw new Error()
            }

            return user;
        } catch (e) {
            return Boom.forbidden(e);
        }
    }
}
