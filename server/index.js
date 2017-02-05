import http from 'http';
import express from 'express';
import { connectMiddleware } from './server_middleware_setup';
import { route } from './routes';

const app = express();
const server = http.Server(app);
const DEV_PORT = 3000;
const PORT = process.env.PORT || DEV_PORT;

connectMiddleware(app);
route(app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
