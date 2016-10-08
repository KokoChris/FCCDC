import {combineReducers} from 'redux';




const rootReducer = combineReducers({
   test: () => { return {koko:'koko'}}
});


export default rootReducer;