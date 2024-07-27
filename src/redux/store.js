import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'

import {
	appReducer,
	authReducer,
	registerReducer,
	userReducer,
	productReducer,
	categoryReducer,
	cartReducer,
	orderReducer,
} from './reducers'

const reducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	register: registerReducer,
	user: userReducer,
	product: productReducer,
	category: categoryReducer,
	cart: cartReducer,
	order: orderReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
