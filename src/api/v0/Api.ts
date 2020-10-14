
'use strict';
import { User } from './lib/User';
import { Auth } from './lib/Auth';
export class Api {

    user: User;
    auth: Auth;

    constructor(config, models) {
        this.auth = new Auth(models, config);
        this.user = new User(models);

    }
}
