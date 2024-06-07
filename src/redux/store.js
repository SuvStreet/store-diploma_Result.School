import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'

import {
	appReducer,
	userReducer,
	productsReducer,
	categoriesReducer,
	cartReducer,
	orderReducer,
} from './reducers'

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	products: productsReducer,
	categories: categoriesReducer,
	cart: cartReducer,
	order: orderReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
