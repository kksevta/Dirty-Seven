import { combineReducers } from 'redux'

import { players } from './players-reducer';
import { rooms } from './rooms-reducer';
import { cards } from './cards-reducer';

const RootReducer = combineReducers({
    players,
    rooms,
    cards
})

export { RootReducer }