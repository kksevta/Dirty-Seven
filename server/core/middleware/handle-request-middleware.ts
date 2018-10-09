import { addNewPlayer, startGame, joinRoom, createRoom, playCard, getNewCard, sendMessage } from '../controllers/app.controller';
import { getNewRoomID } from '../utils/utils';
export const handleRequest = (req, res, next) => {
    let requestResult = {
        message: '',
        valid: false
    };
    const reqPath = req.path;
    let playerID = '';
    let roomID = '';
    let playerName = '';
    let cardID = '';
    switch (reqPath) {
        case '/api/continueplaywithname/':
            playerID = res.locals.JWTDecoded.playerID;
            playerName = req.body.playerName;
            if (playerID && playerName) {
                requestResult = addNewPlayer(playerName, playerID)
            }
            break;

        case '/api/startgame/':
            playerID = res.locals.JWTDecoded.playerID;
            if (playerID) {
                requestResult = startGame(playerID);
            }
            break;

        case '/api/joinroom/':
            playerID = res.locals.JWTDecoded.playerID;
            roomID = req.body.roomID;
            if (playerID && roomID) {
                requestResult = joinRoom(playerID, roomID);
            }
            break;

        case '/api/createroom/':
            playerID = res.locals.JWTDecoded.playerID;
            roomID = getNewRoomID();
            if (playerID) {
                res.locals.roomID = roomID;
                requestResult = createRoom(playerID, roomID);
            }
            break;

        case '/api/playcard/':
            playerID = res.locals.JWTDecoded.playerID;
            cardID = req.body.cardID;
            if (playerID && cardID) {
                requestResult = playCard(playerID, cardID);
            }
            break;

        case '/api/getnewcard/':
            playerID = res.locals.JWTDecoded.playerID;
            if (playerID) {
                requestResult = getNewCard(playerID);
            }
            break;

        case '/api/sendmessage/':
            playerID = res.locals.JWTDecoded.playerID;
            const message = req.body.message;
            if (playerID && message) {
                requestResult = sendMessage(playerID, message);
            }
            break;
    }
    if (requestResult.valid) {
        next()
    } else {
        res.status(401).send(requestResult.message);
    }
}