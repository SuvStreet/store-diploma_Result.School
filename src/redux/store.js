import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'

import {
	appReducer,
	userReducer,
	productsReducer,
	categoriesReducer,
	cartReducer,
	ordersReducer,
} from './reducers'

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	products: productsReducer,
	categories: categoriesReducer,
	cart: cartReducer,
	orders: ordersReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
