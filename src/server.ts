"use strict";
require("dotenv").config();

import * as Hapi from "@hapi/hapi";
import * as Inert from '@hapi/inert';
import * as Jwt from 'hapi-auth-jwt2';
import { validateFunc } from './validate';
import { v0 } from "./api/v0";
import { connect } from './connections/main';

const init = async () => {
  const { config } = require("./config");


  const server = Hapi.server({
    port: config.api.port,
    host: config.api.host,
  });
  const models: any = await connect(config);
  await server.register([Inert, Jwt]);
  server.auth.strategy('jwt', 'jwt', {
    key: config.auth.secret.jwt,
    validate: validateFunc(models),
    verifyOptions: { algorithms: ['HS256'] }
  });
  server.auth.default('jwt');
  server.route({
    method: 'GET',
    path: '/{params*}',
    options: { auth: false },
    handler: {
      directory: {
        path: './public'
      }
    }
  });
  await server.register([{
    plugin: v0,
    routes: {
      prefix: '/v0'
    },
    options: { config, models }
  }]);
  await server.start();
};

init();
