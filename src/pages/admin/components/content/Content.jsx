import PropTypes from 'prop-types'
import { Route, Routes } from 'react-router-dom'

import { Products } from './pages'

import styled from 'styled-components'

const ContentContainer = ({ className }) => {
	return (
		<div className={className}>
			<Routes>
				<Route path='/' element={<div>Добро пожаловать в Dashboard</div>} />
				<Route path='products' element={<Products />}>
					<Route path='add' element={<div>Добавить продукт</div>} />
					<Route path='edit/:id' element={<div>Добавить продукт</div>} />
				</Route>
				<Route path='categories' element={<div>Категории</div>} />
				<Route path='sub-categories' element={<div>Подкатегории</div>} />
				<Route path='orders' element={<div>Заказы</div>} />
				<Route path='users' element={<div>Пользователи</div>} />
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
