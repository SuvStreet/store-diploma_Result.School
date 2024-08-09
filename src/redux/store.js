import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'

import {
	appReducer,
	userReducer,
	productsListReducer,
	singleProductReducer,
	categoriesReducer,
	cartReducer,
	orderReducer,
} from './reducers'

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	productsList: productsListReducer,
	singleProduct: singleProductReducer,
	categories: categoriesReducer,
	cart: cartReducer,
	order: orderReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
