"use strict";
import { Api } from './Api';
export class Routes {
  api: Api;

  constructor(config, models) {
    this.api = new Api(config, models);
  }

  get(): Array<any> {
    return [
      {
        method: 'POST',
        path: '/login',
        options: { auth: false },
        handler: this.api.auth.login,
      },
      {
        method: 'POST',
        path: '/signup',
        options: { auth: false },
        handler: this.api.auth.signup,
      },
      {
        method: 'GET',
        path: '/me',
        options: { auth: false },
        handler: this.api.auth.me,
      },
    ];
  }
}
