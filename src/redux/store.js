import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk' // da acesso ao dispatch para mandar uama ação

// reducers
import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'

const initialState = {}

const middleware = [thunk]

// name dos objetos no state
const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
})

const store = createStore(
    reducers, 
    initialState, 
    compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default store