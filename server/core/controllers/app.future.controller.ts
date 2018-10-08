import { store } from '../../redux-store/root-store';
import { getRandomNumber, getRandomNumbersArray, getRandomNumberExcludingList, getMultipleRandomNumbersExcludingList } from '../utils/utils';
import { addNewRoomAction, updateRoomAction } from '../../redux-store/actions/rooms-actions';
import { updatePlayerAction, addNewPlayerAction, removePlayerAction } from '../../redux-store/actions/players-actions';
import { ROOM_NOT_FOUND, NOT_AUTHORIZED_TO_START_GAME, MOVE_NOT_ALLOWED, NOT_ALLOWED_TO_JOIN_ROOM } from '../config/app-constants';
import { getNewPlayerInfo, getNewRoomInfo, canPlayerJoinRoom, getCurrentPlayersAfterJoin, canPlayerStartGame, getInitialRandomCardsForPlayersInGame, getStartGameState, getRoomStateWhenPlayerLeft } from '../game/game-engine';
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
    store.dispatch(updatePlayerAction({ playerID: playerID, playerInfo: { roomID } }));
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
            store.dispatch(updatePlayerAction({ playerID: playerID, playerInfo: { roomID } }));
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
    const allPlayers = state['players'];
    const roomID = allPlayers.find((player) => {
        return player.playerID === playerID
    })['roomID'];

    if (roomID) {
        const room = allRooms.find((room) => {
            return room.roomID === roomID
        });
        if (room) {
            if (canPlayerStartGame(playerID, room)) {
                // need to assign some random cards to all players
                const allCards = store.getState()['cards'];
                const randomCardsForPlayers = getInitialRandomCardsForPlayersInGame(room, allCards)
                for (let i = 0; i < room.currentPlayers.length; i++) {
                    store.dispatch(updatePlayerAction({ playerID: room.currentPlayers[i], playerInfo: { currentCards: randomCardsForPlayers[i] } }));
                }

                const roomInfo = getStartGameState();
                store.dispatch(updateRoomAction({ roomID, roomInfo }));

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
    const room = allRooms.find((room) => {
        return room.currentPlayers.indexOf(playerID) >= 0
    })

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
    const rooms = state['rooms'];
    const players = state['players'];
    const cards = state['cards'];

    const player = players.find((player) => {
        return player.playerID === playerID
    })
    const roomID = player['roomID'];


    if (roomID) {
        const room = rooms.find((room) => {
            return room.roomID === roomID
        });
        if (room) {
            // if (room.turn !== playerID) {
            //     return {
            //         valid: false,
            //         message: MOVE_NOT_ALLOWED
            //     };
            // }
            let cardsListToFilter = [];
            const cardsLength = cards.length;
            const minIndex = 1;
            for (let i = 0; i < players.length; i++) {
                if (room.currentPlayers.indexOf(players[i].playerID) >= 0) {
                    cardsListToFilter = cardsListToFilter.concat(players[i].currentCards);
                }
            }
            cardsListToFilter.push(room.topCard);
            let randomCards = undefined;
            let roomInfo = {};
            if (room.sevenCounter > 0) {
                randomCards = getMultipleRandomNumbersExcludingList(cardsLength, minIndex, cardsListToFilter, (room.sevenCounter) * 2);
                roomInfo = {
                    sevenCounter: 0
                }
            } else {
                randomCards = getRandomNumberExcludingList(cardsLength, minIndex, cardsListToFilter);
            }

            store.dispatch(updatePlayerAction({ playerID, playerInfo: { currentCards: player.currentCards.concat(randomCards) } }));


            const playersNotWon = room.currentPlayers.filter((player) => {
                return room.winningOrder.indexOf(player) < 0;
            });


            if (room.playerTurn === playerID && playersNotWon.length > 1) {
                const playerIndex = playersNotWon.indexOf(playerID);
                const playerTurnIndex = (playerIndex + 1) <= (playersNotWon.length - 1) ? (playerIndex + 1) : 0;
                roomInfo = {
                    ...roomInfo,
                    playerTurn: playersNotWon[playerTurnIndex]
                }
            }

            store.dispatch(updateRoomAction({ roomID, roomInfo }));

            return {
                valid: true,
                message: ''
            };
        } else {
            return {
                valid: false,
                message: ROOM_NOT_FOUND
            };
        }
    } else {
        return {
            valid: false,
            message: ROOM_NOT_FOUND
        };
    }
}



export const playCard = (playerID, cardID) => {
    const state = store.getState();
    const allRooms = state['rooms'];
    const allPlayers = state['players'];
    const allCards = state['cards'];

    const player = allPlayers.find((player) => {
        return player.playerID === playerID
    })
    const roomID = player['roomID'];


    if (roomID) {
        const room = allRooms.find((room) => {
            return room.roomID === roomID
        });
        if (room) {
            // if (room.turn !== playerID) {
            //     return {
            //         valid: false,
            //         message: MOVE_NOT_ALLOWED
            //     };
            // }
            const topCardDetails = allCards.find((card) => { return card.cardID === room.topCard });
            const playedCardDetails = allCards.find((card) => { return card.cardID === cardID });
            let roomInfo = { ...room };
            let playerInfo = { ...player };

            // start section conditions where move is not allowed
            if (room.sevenCounter > 0 && playedCardDetails.value !== '7') {
                return {
                    valid: false,
                    message: MOVE_NOT_ALLOWED
                };
            }
            if (playedCardDetails.value !== 'K') {
                if ((playedCardDetails.suit !== topCardDetails.suit) && (playedCardDetails.value !== topCardDetails.value)) {
                    return {
                        valid: false,
                        message: MOVE_NOT_ALLOWED
                    };
                }
            }
            //end section conditions where move is not allowed





            // reduce card of player
            // change top card
            // change turn
            // check winner and finish game
            // increase seven counter


            //change top card
            roomInfo = {
                ...roomInfo,
                topCard: cardID
            }


            const playersNotWon = roomInfo.currentPlayers.filter((player) => {
                return roomInfo.winningOrder.indexOf(player) < 0;
            });

            // change turn
            const playerIndex = playersNotWon.indexOf(playerID);
            const playerTurnIndex = (playerIndex + 1) <= (playersNotWon.length - 1) ? (playerIndex + 1) : 0;
            roomInfo = {
                ...roomInfo,
                playerTurn: playersNotWon[playerTurnIndex]
            }


            if (playedCardDetails.value === '7') {
                roomInfo = {
                    ...roomInfo,
                    sevenCounter: roomInfo.sevenCounter + 1
                }
            }

            if (playedCardDetails.value === 'A') {
                const nextPlayerIndex = playersNotWon.indexOf(roomInfo.playerTurn);
                const playerTurnIndex = (nextPlayerIndex + 1) <= (playersNotWon.length - 1) ? (nextPlayerIndex + 1) : 0;
                roomInfo = {
                    ...roomInfo,
                    playerTurn: playersNotWon[playerTurnIndex]
                }
            }


            // If 2 , then next player will get one card
            if (playedCardDetails.value === '2') {
                const nextPlayerID = roomInfo.playerTurn;
                let nextPlayerInfo = { ...allPlayers.find((player) => { return player.playerID === nextPlayerID }) };
                let cardsListToFilter = [];
                const cardsLength = allCards.length;
                const minIndex = 1;
                for (let i = 0; i < allPlayers.length; i++) {
                    if (roomInfo.currentPlayers.indexOf(allPlayers[i].playerID) >= 0) {
                        cardsListToFilter = cardsListToFilter.concat(allPlayers[i].currentCards);
                    }
                }
                cardsListToFilter.push(roomInfo.topCard);
                const randomCard = getRandomNumberExcludingList(cardsLength, minIndex, cardsListToFilter);
                nextPlayerInfo = {
                    ...nextPlayerInfo,
                    currentCards: nextPlayerInfo.currentCards.concat(randomCard)
                }
                store.dispatch(updatePlayerAction({ playerID: nextPlayerID, playerInfo: nextPlayerInfo }));
            }


            const playedCardIndex = player.currentCards.indexOf(cardID);
            playerInfo = {
                ...playerInfo,
                currentCards: [
                    ...player.currentCards.slice(0, playedCardIndex),
                    ...player.currentCards.slice(playedCardIndex + 1)
                ]
            }

            if (playerInfo.currentCards.length < 1) {
                roomInfo = {
                    ...roomInfo,
                    winningOrder: roomInfo.winningOrder.concat(playerID)
                }
            }

            if (roomInfo.winningOrder.length === roomInfo.currentPlayers.length - 1) {
                roomInfo = {
                    ...roomInfo,
                    finished: true
                }
            }


            store.dispatch(updateRoomAction({ roomID, roomInfo }));
            store.dispatch(updatePlayerAction({ playerID, playerInfo }));



            return {
                valid: true,
                message: ''
            }

        } else {
            return {
                valid: false,
                message: ROOM_NOT_FOUND
            };
        }
    }
    return {
        valid: false,
        message: ROOM_NOT_FOUND
    };
}

export const getRandomCard = () => {
    const cards = store.getState()['cards'];
    const cardsLength = cards.length;
    const minIndex = 1;
    return cards[getRandomNumber(cardsLength - 1, minIndex)]['cardID'];
}