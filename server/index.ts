import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { logError, logInfo } from './core/logger/app-logger';
import config from './core/config/config.dev'
import { setUpWebSocketServer } from './simple-socket';
import { authorizeToken } from './core/middleware/authorize-token-middleware';
import { handleRequest } from './core/middleware/handle-request-middleware';

const port = config.serverPort;
const corsOptions = config.corsOptions;
const app = express();

app.use(express.static('public'))

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/continueplaywithname', authorizeToken, handleRequest, (req, res) => {
  res.setHeader('token', res.locals.token);
  res.status(200).send({ status: 'Player Created' });
});

app.post('/api/createroom', authorizeToken, handleRequest, (req, res) => {
  res.status(200).send({ roomID: res.locals.roomID, status: 'Room Created' });
});

app.post('/api/joinroom', authorizeToken, handleRequest, (req, res) => {
  res.status(200).send({ status: 'Room Joined' });
});

app.post('/api/startgame', authorizeToken, handleRequest, (req, res) => {
  res.status(200).send({ status: 'Game Started' });
});

app.post('/api/playcard', authorizeToken, handleRequest, (req, res) => {
  res.status(200).send({ status: 'Card Played' });
});

app.post('/api/getnewcard', authorizeToken, handleRequest, (req, res) => {
  res.status(200).send({ status: 'Card Recieved' });
});

app.get('/', (req, res) => {
  res.send('empty')
});

app.listen(port, () => {
  logInfo('server started - ' + port);
});

setUpWebSocketServer();