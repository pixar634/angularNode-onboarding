'use strict';

import * as Boom from '@hapi/boom';
let _models;

export class User {
    constructor(models) {
        _models = models;
    }

    async get() {
        let users;
        try {
            users = await _models.User.find({}, { password: 0 }).lean();
            return users;
        } catch (err) {
            return Boom.internal(err);
        }
    }

}
