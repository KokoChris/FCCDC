import {combineReducers} from 'redux';
import characterReducer from './characterReducer';
import roomReducer from './roomReducer';

const rootReducer = combineReducers({
   characterReducer,
   roomReducer
});


export default rootReducer;