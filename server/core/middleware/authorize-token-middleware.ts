import { getNewRoomID, getNewPlayerID } from '../utils/utils';
import { PLAYER_NAME_NOT_PROVIDED } from '../config/app-constants';
import config from '../config/config.dev';
var jwt = require('jsonwebtoken');
const JWTSecret = config.JWTSecret;

export const authorizeToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    let authorizationToken = '';
    if (authorizationHeader) {
        authorizationToken = authorizationHeader.split(' ')[1];
    }
    jwt.verify(authorizationToken, JWTSecret, function (err, decodedToken) {
        if (err) {
            if (req.path === '/api/continueplaywithname/' && req.body.playerName) {
                const payload = {
                    playerID: getNewPlayerID()
                    // playerID: req.body.playerName
                }
                var token = jwt.sign(payload, JWTSecret);
                res.locals.JWTDecoded = payload;
                res.locals.token = token;
                next();
            }
            else {
                res.status(401).send({ message: PLAYER_NAME_NOT_PROVIDED });
            }
        } else {
            res.locals.JWTDecoded = decodedToken;
            next()
        }
    });
}

