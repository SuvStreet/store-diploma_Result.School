import { Routes, Route, Navigate } from 'react-router-dom'

import { Header, Footer, ProtectedRoute } from './components'
import {
	Authorization,
	Products,
	Registration,
	Admin,
	Main,
	Product,
	Profile,
	Category,
} from './pages'
import { WorkWithProducts } from './pages/admin/components'

import { useSelector } from 'react-redux'
import { selectAppIsAuth } from './redux/selectors'
import { EditForm } from './pages/profile/components'

import styled from 'styled-components'

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 1200px;
	width: 100%;
	min-height: 100dvh;
	margin: 0 auto;
	text-align: center;
	padding: 0 20px;
`

const Page = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	flex: 1 0 auto;
	padding: 20px 0;
`

export const Store = () => {
	const isAuth = useSelector(selectAppIsAuth)

	const isAuthorized = ({ children, redirectTo }) => {
		return isAuth ? <Navigate to={redirectTo} /> : children
	}

	return (
		<AppContainer>
			<Header />
			<Page>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route
						path='/authorize'
						element={isAuthorized({
							children: <Authorization />,
							redirectTo: '/',
						})}
					/>
					<Route
						path='/register'
						element={isAuthorized({
							children: <Registration />,
							redirectTo: '/',
						})}
					/>
					<Route
						path='/profile/:id'
						element={
							<ProtectedRoute redirectTo='/authorize'>
								<Profile />
							</ProtectedRoute>
						}
					>
						<Route path='edit' element={<EditForm />} />
					</Route>
					<Route path='/categories/:id' element={<Category />}>
						<Route path='products/:productsId' element={<Products />} />
					</Route>
					<Route path='/product/:id' element={<Product />} />
					<Route path='/admin/*' element={<Admin />}>
						<Route path='users' element={<div>Редактирование пользователей</div>} />
						<Route path='products/add' element={<WorkWithProducts />} />
						<Route path='products/edit/:productId' element={<WorkWithProducts />} />
					</Route>
					<Route path='/cart' element={<div>Корзина (Cart)</div>} />
					<Route path='*' element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Footer />
		</AppContainer>
	)
}
