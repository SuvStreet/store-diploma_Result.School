import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Header, Footer, ProtectedRoute } from './components'
import { Authorization, Registration } from './pages'
import { getSessionHash } from './utils'

import s from 'styled-components'

const AppContainer = s.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 1280px;
	width: 100%;
	height: 100dvh;
  margin: 0 auto;
  text-align: center;
	padding: 0 20px;
`

const Page = s.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	flex: 1 0 auto;
	padding: 20px 0;
`

export const Store = () => {
	return (
		<AppContainer>
			<Header />
			<Page>
				<Routes>
					<Route path='/' element={<div>Главная страница (Home)</div>} />
					<Route
						path='/authorize'
						element={
							<ProtectedRoute redirectTo='/'>
								<Authorization />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/register'
						element={
							<ProtectedRoute redirectTo='/'>
								<Registration />
							</ProtectedRoute>
						}
					/>
					<Route path='/profile' element={<div>Личный кабинет (Profile)</div>} />
					<Route path='/catalog' element={<div>Каталог (Catalog)</div>} />
					<Route path='/cart' element={<div>Корзина (Cart)</div>} />
					<Route path='/product/:id' element={<div>Страница товара (Product)</div>} />
					<Route path='*' element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Footer />
		</AppContainer>
	)
}