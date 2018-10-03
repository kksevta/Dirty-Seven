import { createStore } from 'redux'
import { RootReducer } from './reducers/root-reducer';
const store = createStore(RootReducer);
export { store };