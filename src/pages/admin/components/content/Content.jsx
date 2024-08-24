import PropTypes from 'prop-types'
import { Route, Routes } from 'react-router-dom'

import { Categories, Products, SubCategories, Users } from './pages'

import styled from 'styled-components'
import { ProductForm } from './forms/product-form/ProductForm'

const ContentContainer = ({ className }) => {
	console.log('ContentContainer')

	return (
		<div className={className}>
			<Routes>
				<Route path='/' element={<div>Добро пожаловать в Dashboard</div>} />
				<Route path='products' element={<Products />}>
					<Route path='add' element={<ProductForm />} />
					<Route path='edit/:id' element={<ProductForm />} />
				</Route>
				<Route path='categories' element={<Categories />}>
					<Route path='add' element={<div>Добавить категорию</div>} />
					<Route path='edit/:id' element={<div>Добавить категорию</div>} />
				</Route>
				<Route path='sub-categories' element={<SubCategories />}>
					<Route path='add' element={<div>Добавить подкатегорию</div>} />
					<Route path='edit/:id' element={<div>Добавить подкатегорию</div>} />
				</Route>
				<Route path='orders' element={<div>Заказы</div>} />
				<Route path='users' element={<Users />} />
			</Routes>
		</div>
	)
}

export const Content = styled(ContentContainer)`
	flex: 1;
	padding: 20px;
`

ContentContainer.propTypes = {
	className: PropTypes.string,
}
