import { combineReducers } from 'redux'
import sesionReducer from './sesionReducer'

const rootReducer = combineReducers({
    sesionReducer,
});

export default rootReducer;