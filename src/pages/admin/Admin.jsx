import propTypes from 'prop-types'

import { Tabs } from './components/tabs/Tabs'

import styled from 'styled-components'

const TabData = [
	{
		title: 'Пользователи',
		path: '/admin/users',
	},
	{
		title: 'Работа с товарами',
		path: '/admin/products/add',
	},
]

const AdminContainer = ({ className }) => {
	return <div className={className}>
		<Tabs tabs={TabData} />
	</div>
}

export const Admin = styled(AdminContainer)`
	width: 100%;
`

AdminContainer.propTypes = {
	className: propTypes.string.isRequired,
}
