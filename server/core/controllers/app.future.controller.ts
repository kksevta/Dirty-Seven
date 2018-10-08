import { store } from '../../redux-store/root-store';
import { getRandomNumber, getRandomNumbersArray, getRandomNumberExcludingList, getMultipleRandomNumbersExcludingList } from '../utils/utils';
import { addNewRoomAction, updateRoomAction } from '../../redux-store/actions/rooms-actions';
import { updatePlayerAction, addNewPlayerAction, removePlayerAction } from '../../redux-store/actions/players-actions';
import { ROOM_NOT_FOUND, NOT_AUTHORIZED_TO_START_GAME, MOVE_NOT_ALLOWED, NOT_ALLOWED_TO_JOIN_ROOM, OPERATION_NOT_ALLOWED } from '../config/app-constants';
import { getNewPlayerInfo, getNewRoomInfo, canPlayerJoinRoom, getCurrentPlayersAfterJoin, canPlayerStartGame, getInitialRandomCardsForPlayersInGame, getStartGameState, getRoomStateWhenPlayerLeft, getRoomFromPlayerID, canPlayerGetNewCard, getAllCardsInRoom, getNewCardsForPlayerAfterGet, getNextPlayerIDForTurn, isValidMove, getUpdatedRoomStateWhenCardPlayed, getUpdatedCurrentPlayerStateWhenCardPlayed, getUpdatedNextPlayerStateWhenCardPlayed } from '../game/game-engine';
// We are using redux to hold the current state of the game.
// We might have to make change in this file only, if we need some DB for storing the state of the game 

export const addNewPlayer = (playerName, playerID) => {
    const playerInfo = getNewPlayerInfo(playerName, playerID);
    store.dispatch(addNewPlayerAction({ playerInfo }))
    return {
        valid: true,
        message: ''
    };
}

export const createRoom = (playerID, roomID) => {
    const allCards = store.getState()['cards'];
    const roomInfo = getNewRoomInfo(playerID, roomID, allCards)
    store.dispatch(addNewRoomAction({ roomInfo }));
    return {
        valid: true,
        message: ''
    };
}

export const joinRoom = (playerID, roomID) => {
    const allRooms = store.getState()['rooms'];
    const room = allRooms.find((room) => {
        return room.roomID === roomID
    });
    if (room) {
        if (canPlayerJoinRoom(room, playerID)) {
            const currentPlayers = getCurrentPlayersAfterJoin(room, playerID);
            store.dispatch(updateRoomAction({ roomID: roomID, roomInfo: { currentPlayers } }))
            return {
                valid: true,
                message: ''
            }
        }
        else {
            return {
                valid: false,
                message: NOT_ALLOWED_TO_JOIN_ROOM
            }
        }
    } else {
        return {
            valid: false,
            message: ROOM_NOT_FOUND
        }
    }
}

export const startGame = (playerID) => {
    const state = store.getState();
    const allRooms = state['rooms'];
    const room = getRoomFromPlayerID(allRooms, playerID);
    if (room) {
        if (canPlayerStartGame(playerID, room)) {
            // need to assign some random cards to all players
            const allCards = store.getState()['cards'];
            const randomCardsForPlayers = getInitialRandomCardsForPlayersInGame(room, allCards)
            for (let i = 0; i < room.currentPlayers.length; i++) {
                store.dispatch(updatePlayerAction({ playerID: room.currentPlayers[i], playerInfo: { currentCards: randomCardsForPlayers[i] } }));
            }

            const roomInfo = getStartGameState();
            store.dispatch(updateRoomAction({ roomID: room.roomID, roomInfo }));

            return {
                valid: true,
                message: ''
            };
        } else {
            return {
                valid: false,
                message: NOT_AUTHORIZED_TO_START_GAME
            };
        }
    } else {
        return {
            valid: false,
            message: ROOM_NOT_FOUND
        };
    }
}

export const playerLeft = (playerID) => {
    const state = store.getState();
    const allRooms = state['rooms'];
    const room = getRoomFromPlayerID(allRooms, playerID);

    store.dispatch(removePlayerAction({ playerID }));
    if (room) {
        const roomInfo = getRoomStateWhenPlayerLeft(room, playerID)
        store.dispatch(updateRoomAction({ roomID: room.roomID, roomInfo }));
        return {
            valid: true,
            message: ''
        };
    }
    else {
        return {
            valid: true,
            message: ''
        };
    }
}

export const getNewCard = (playerID) => {
    const state = store.getState();
    const allRooms = state['rooms'];
    const allPlayers = state['players'];
    const allCards = state['cards'];


    const player = allPlayers.find((player) => {
        return player.playerID === playerID
    })


    const room = getRoomFromPlayerID(allRooms, playerID);

    if (room) {
        if (canPlayerGetNewCard(playerID, allRooms)) {
            let roomInfo: any = {
                sevenCounter: 0
            };
            const newCards = getNewCardsForPlayerAfterGet(room, player, allPlayers, allCards);
            store.dispatch(updatePlayerAction({ playerID, playerInfo: { currentCards: player.currentCards.concat(newCards) } }));


            const nextPlayerTurn = getNextPlayerIDForTurn(room, playerID);
            roomInfo = {
                ...roomInfo,
                playerTurn: nextPlayerTurn
            }
            store.dispatch(updateRoomAction({ roomID: room.roomID, roomInfo }));

            return {
                valid: true,
                message: ''
            };
        }
        else {
            return {
                valid: false,
                message: OPERATION_NOT_ALLOWED
            };
        }
    } else {
        return {
            valid: false,
            message: ROOM_NOT_FOUND
        };
    }
}




export const playCard = (playerID, playedCardID) => {
    const state = store.getState();
    const allRooms = state['rooms'];
    const allPlayers = state['players'];
    const allCards = state['cards'];

    const player = allPlayers.find((player) => {
        return player.playerID === playerID
    })

    const room = getRoomFromPlayerID(allRooms, playerID);

    if (room) {
        if (isValidMove(room, player, allCards, playedCardID)) {
            const playedCardDetails = allCards.find((card) => { return card.cardID === playedCardID });
            const roomInfo = getUpdatedRoomStateWhenCardPlayed(room, player, playedCardDetails);
            const currentPlayerInfo = getUpdatedCurrentPlayerStateWhenCardPlayed(player, playedCardID);

            store.dispatch(updateRoomAction({ roomID: room.roomID, roomInfo }));
            store.dispatch(updatePlayerAction({ playerID, playerInfo: { currentPlayerInfo } }));


            // // If 2 , then next player will get one card
            if (playedCardDetails.value === '2') {
                const nextPlayerID = roomInfo.playerTurn;
                let nextPlayerInfo = { ...allPlayers.find((player) => { return player.playerID === nextPlayerID }) };
                nextPlayerInfo = getUpdatedNextPlayerStateWhenCardPlayed(roomInfo, nextPlayerInfo, allPlayers, allCards)
                store.dispatch(updatePlayerAction({ playerID: nextPlayerID, playerInfo: nextPlayerInfo }));
            }


            return {
                valid: true,
                message: ''
            }

        } else {
            return {
                valid: false,
                message: MOVE_NOT_ALLOWED
            };
        }
    } else {
        return {
            valid: false,
            message: ROOM_NOT_FOUND
        };
    }

}

export const getRandomCard = () => {
    const cards = store.getState()['cards'];
    const cardsLength = cards.length;
    const minIndex = 1;
    return cards[getRandomNumber(cardsLength - 1, minIndex)]['cardID'];
}