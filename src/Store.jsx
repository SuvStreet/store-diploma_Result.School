import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAppIsAuth } from './redux/selectors'

import { Header, Footer, ProtectedRoute, Error, Modal } from './components'
import {
	Authorization,
	ProductsList,
	Registration,
	Admin,
	Main,
	Product,
	Profile,
	SubCategory,
} from './pages'
import { EditForm } from './pages/profile/components'

import styled from 'styled-components'

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 1400px;
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
					<Route path='/categories/:id' element={<SubCategory />} />
					<Route path='/products/sub-category/:subCategoryId' element={<ProductsList />} />
					<Route path='/products/:id' element={<Product />} />
					<Route path='/admin/*' element={<Admin />} />
					<Route path='/cart' element={<div>Корзина (Cart)</div>} />
					<Route
						path='*'
						element={<Error titleError='Страница не найдена' spin></Error>}
					/>
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppContainer>
	)
}
