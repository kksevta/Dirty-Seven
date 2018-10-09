import { getRandomNumber } from '../utils/utils';
import { getRandomNumbersInArrayFormat, getRandomNumbersExcludingList } from '../utils/utils'
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
    return room.canStartedBy === playerID && room.currentPlayers.length > 1;
}

export const canPlayerGetNewCard = (playerID, allRooms) => {
    return true;   // TO DO need to implement
}

export const getAllCardsInRoom = (room, allPlayers) => {
    let cardsInRoom = [];
    for (let i = 0; i < allPlayers.length; i++) {
        if (room.currentPlayers.indexOf(allPlayers[i].playerID) >= 0) {
            cardsInRoom = cardsInRoom.concat(allPlayers[i].currentCards);
        }
    }
    cardsInRoom.push(room.topCard);

    return cardsInRoom;
}

export const getInitialRandomCardsForPlayersInGame = (room, allCards) => {
    const cardsLength = allCards.length;
    const playersInRoom = room.currentPlayers;
    return getRandomNumbersInArrayFormat(cardsLength, minCardIDIndex, playersInRoom.length, room.maxCardsPerPlayer);
}

export const getStartGameState = () => {
    return { started: true };
}


export const getNewCardsForPlayerAfterGet = (room, player, allPlayers, allCards) => {
    const cardsLength = allCards.length;
    const allCardsInRoom = getAllCardsInRoom(room, allPlayers);
    return getRandomNumbersExcludingList(cardsLength, minCardIDIndex, allCardsInRoom, (room.sevenCounter) * 2);
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
                playerTurn: getNextPlayerIDForTurn(room, playerID)
            }
        }
        return roomInfo;
    }
    return room;
}

export const getNextPlayerIDForTurn = (room, currentTurnPlayerID) => {
    const playersNotWon = getPlayersNotWonInRoom(room);
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

export const getRoomFromPlayerID = (allRooms, playerID) => {
    return allRooms.find((room) => {
        return room.currentPlayers.indexOf(playerID) >= 0
    });
}
export const getRandomCard = (allCards) => {
    const cardsLength = allCards.length;
    return allCards[getRandomNumber(cardsLength, minCardIDIndex)]['cardID'];
}

export const isValidMove = (room, player, allCards, playedCardID) => {
    const topCardDetails = allCards.find((card) => { return card.cardID === room.topCard });
    const playedCardDetails = allCards.find((card) => { return card.cardID === playedCardID });
    if (player.currentCards.indexOf(playedCardID) < 0) {
        return false;
    }

    if (room.playerTurn !== player.playerID) {
        return false;
    }

    if (room.sevenCounter > 0 && playedCardDetails.value !== '7') {
        return false
    }

    if (playedCardDetails.value !== 'K') {
        if ((playedCardDetails.suit !== topCardDetails.suit) && (playedCardDetails.value !== topCardDetails.value)) {
            return false
        }
    }
    return true;
}


export const getUpdatedRoomStateWhenCardPlayed = (room, player, playedCardDetails) => {
    let roomInfo = {
        ...room,
        topCard: playedCardDetails.cardID,
        playerTurn: getNextPlayerIDForTurn(room, player.playerID)
    }


    if (playedCardDetails.value === '7') {
        roomInfo = {
            ...roomInfo,
            sevenCounter: roomInfo.sevenCounter + 1
        }
    }

    if (playedCardDetails.value === 'A') {
        roomInfo = {
            ...roomInfo,
            playerTurn: getNextPlayerIDForTurn(room, roomInfo.playerTurn)
        }
    }

    if (player.currentCards.length < 1) {
        roomInfo = {
            ...roomInfo,
            winningOrder: roomInfo.winningOrder.concat(player.playerID)
        }
    }

    if (roomInfo.winningOrder.length === roomInfo.currentPlayers.length - 1) {
        roomInfo = {
            ...roomInfo,
            finished: true
        }
    }

    return roomInfo;
}

export const getUpdatedCurrentPlayerStateWhenCardPlayed = (player, playedCardID) => {
    const playedCardIndex = player.currentCards.indexOf(playedCardID);
    let playerInfo = { ...player };
    playerInfo = {
        ...playerInfo,
        currentCards: [
            ...player.currentCards.slice(0, playedCardIndex),
            ...player.currentCards.slice(playedCardIndex + 1)
        ]
    }
    return playerInfo;
}

export const getUpdatedNextPlayerStateWhenCardPlayed = (room, nextPlayerInfo, allPlayers, allCards) => {
    const allCardsInRoom = getAllCardsInRoom(room, allPlayers);
    const cardsLength = allCards.length;
    const randomNewCard = getRandomNumbersExcludingList(cardsLength, minCardIDIndex, allCardsInRoom, 1);
    return nextPlayerInfo = {
        ...nextPlayerInfo,
        currentCards: nextPlayerInfo.currentCards.concat(randomNewCard)
    }
}