import { store } from './redux-store/root-store';
import config from './core/config/config.dev';
import { playerLeft } from './core/controllers/app.past.controller';
const WebSocket = require('ws');
var jwt = require('jsonwebtoken');
const clients = [];
const JWTSecret = config.JWTSecret;
const wss = new WebSocket.Server({ port: 3001 });

export const setUpWebSocketServer = () => {
    wss.on('connection', function connection(ws, req) {
        const requestURL = req.url;
        const authorizationToken = requestURL.split('=')[1];
        let playerID = ''
        jwt.verify(authorizationToken, JWTSecret, function (err, decoded) {
            if (err) {
                ws.close();
            } else {
                playerID = decoded.playerID;
                clients.push({
                    playerID: decoded.playerID,
                    connection: ws
                })
                porcessDataForPlayers();
            }
        })
        if (playerID) {
            ws.on('close', function close() {
                const index = clients.findIndex((client) => {
                    return client.playerID === playerID;
                })
                clients.splice(index, 1);
                playerLeft(playerID)
            });
        }
    });
};


store.subscribe(() => {
    porcessDataForPlayers()
})


const porcessDataForPlayers = () => {
    const state = store.getState();
    const allRooms = state['rooms'];
    const allPlayers = state['players'];
    const allCards = state['cards'];


    for (let i = 0; i < allRooms.length; i++) {
        const playersInRoom = allRooms[i].currentPlayers;
        for (let j = 0; j < playersInRoom.length; j++) {
            const playerConnection = getPlayerConnectionInRoom(clients, playersInRoom[j]);
            const getDataForPlayer = getPlayerDataInRoom(allRooms[i], playersInRoom[j], allPlayers, allCards);
            sendDataToPlayer(playerConnection, getDataForPlayer);
        }
    }
}

const sendDataToPlayer = (playerConnection, data) => {
    // if condition for connection is Alive connection is defined
    //client.readyState === WebSocket.OPEN 
    if (playerConnection && playerConnection.readyState === WebSocket.OPEN) {
        playerConnection.send(JSON.stringify(data));
    }
}

const getPlayerConnectionInRoom = (allConnections, playerID) => {
    const playerConnectionInfo = allConnections.find((connection) => {
        return connection.playerID === playerID
    })
    return playerConnectionInfo ? playerConnectionInfo['connection'] : undefined
}

const getPlayerDataInRoom = (room, playerID, allPlayers, allCards) => {
    const currentPlayerObject = allPlayers.find((player) => {
        return player.playerID === playerID
    });
    let data = {};
    if (currentPlayerObject) {
        const topCard = getFilteredCards([room.topCard], allCards);
        data = {
            players: getMappedPlayersData(room.currentPlayers, allPlayers),
            playerTurn: room.playerTurn,
            canStartedBy: room.canStartedBy,
            roomID: room.roomID,
            gameStarted: room.started,
            me: {
                playerID: playerID,
                playerName: currentPlayerObject['playerName']
            },
            topCard: topCard ? topCard[0] : {},
            myCards: getFilteredCards(currentPlayerObject['currentCards'], allCards),
            playersWinningOrder: room.winningOrder,
            gameFinished: room.finished
        }
    }
    return data;
}


const getFilteredCards = (cardsIDS, cards) => {
    return cards.filter((card) => {
        return cardsIDS.indexOf(card.cardID) >= 0;
    });
}

const getFilteredPlayers = (playersIDS, players) => {
    return players.filter((player) => {
        return playersIDS.indexOf(player.playerID) >= 0;
    });
}

const getMappedPlayersData = (playersIDS, players) => {
    const filterdPlayers = getFilteredPlayers(playersIDS, players);
    return filterdPlayers.map((filteredPlayer) => {
        return { playerID: filteredPlayer.playerID, playerName: filteredPlayer.playerName, noOfCards: Array(filteredPlayer.currentCards.length).fill(1) }
    });
}
