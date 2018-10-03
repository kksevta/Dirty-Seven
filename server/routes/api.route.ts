import * as express from "express";
import { authorizeToken } from '../core/middleware/authorize-token-middleware';

const apiRouter = express.Router();

// apiRouter.post('/continueplaywithname', reduxActions, (req, res) => {
//     res.setHeader('token', res.locals.token);
//     res.status(200).send({ status: 'Player Created' });
// });

// apiRouter.post('/createroom', reduxActions, (req, res) => {
//     res.status(200).send({ status: 'Room Created' });
// });

// apiRouter.post('/joinroom', reduxActions, (req, res) => {
//     res.status(200).send({ status: 'Room Joined' });
// });

// apiRouter.post('/startgame', reduxActions, (req, res) => {
//     res.status(200).send({ status: 'Game Started' });
// });

// apiRouter.post('/playcard', reduxActions, (req, res) => {
//     res.status(200).send({ status: 'Card Played' });
// });

export { apiRouter };