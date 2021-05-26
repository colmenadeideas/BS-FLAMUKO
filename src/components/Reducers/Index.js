import { combineReducers } from 'redux'
import sesionReducer from './sesionReducer'
import filtroReducer from './filtroReducer'
import productoReducer from './productoReducer'

const rootReducer = combineReducers({
    sesionReducer,
    filtroReducer,
    productoReducer
});

export default rootReducer;