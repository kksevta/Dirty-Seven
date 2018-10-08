import { getRandomNumber } from '../utils/utils';
import { getRandomNumbersInArrayFormat } from '../utils/utils'
const minCardIDIndex = 1;

export const getNewPlayerInfo = (playerName, playerID) => {
    return { playerID, playerName };
}

export const getNewRoomInfo = (playerID, roomID, allCards) => {
    return {
        roomID: roomID,
        createdAt: +new Date(),
        canStartedBy: playerID,
        topCard: getRandomCard(allCards),
        currentPlayers: [playerID],
        playerTurn: playerID
    }
}

export const canPlayerJoinRoom = (room, playerID) => {
    return room && room.currentPlayers.length < room.maxPlayers && !room.started && room.currentPlayers.indexOf(playerID) < 0;
}

export const getCurrentPlayersAfterJoin = (room, playerID) => {
    return [...room.currentPlayers, playerID];
}

export const canPlayerStartGame = (playerID, room) => {
    return room.canStartedBy === playerID && room.currentPlayers > 1;
}

export const getInitialRandomCardsForPlayersInGame = (room, allCards) => {
    const cardsLength = allCards.length;
    const playersInRoom = room.currentPlayers;
    return getRandomNumbersInArrayFormat(cardsLength - 1, minCardIDIndex, playersInRoom.length, room.maxCardsPerPlayer);
}

export const getStartGameState = () => {
    return { started: true };
}

export const getRoomStateWhenPlayerLeft = (room, playerID) => {
    if (room) {
        let roomInfo = { ...room };
        const index = room.currentPlayers.indexOf(playerID);
        if (index >= 0 && room.active && !room.finished) {
            roomInfo = {
                ...roomInfo,
                currentPlayers:
                    [
                        ...room.currentPlayers.slice(0, index),
                        ...room.currentPlayers.slice(index + 1)
                    ]
            }
        }

        if (roomInfo.canStartedBy === playerID && !roomInfo.started) {
            if (roomInfo.currentPlayers.length > 0) {
                roomInfo = {
                    ...roomInfo,
                    canStartedBy: roomInfo.currentPlayers[0]
                }
            } else {
                roomInfo = {
                    ...roomInfo,
                    active: false,   //TODO maybe need to delete the room instead of making active false
                }
            }
        }

        if (roomInfo.currentPlayers && room.started) {
            const playersNotWon = getPlayersNotWonInRoom(room);
            if (playersNotWon && playersNotWon.length === 1) {
                roomInfo = {
                    ...roomInfo,
                    winningOrder: roomInfo.winningOrder.concat(playersNotWon),
                    finished: true
                }
            }
            roomInfo = {
                ...roomInfo,
                playerTurn: getNextPlayerIDForTurn(room, playerID, playersNotWon)
            }
        }
        return roomInfo;
    }
    return room;
}

export const getNextPlayerIDForTurn = (room, currentTurnPlayerID, playersNotWon) => {
    if (room.playerTurn === currentTurnPlayerID && playersNotWon.length > 1) {
        const playerIndex = playersNotWon.indexOf(currentTurnPlayerID);
        const playerTurnIndex = (playerIndex + 1) <= (playersNotWon.length - 1) ? (playerIndex + 1) : 0;
        return playersNotWon[playerTurnIndex]
    }
    return room.playerTurn;
}

export const getPlayersNotWonInRoom = (room) => {
    return room.currentPlayers.filter((player) => {
        return room.winningOrder.indexOf(player) < 0;
    })
}


export const getRandomCard = (allCards) => {
    const cardsLength = allCards.length;
    return allCards[getRandomNumber(cardsLength - 1, minCardIDIndex)]['cardID'];
}

export const isValidMove = () => {

}
