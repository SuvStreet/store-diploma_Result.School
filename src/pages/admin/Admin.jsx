import propTypes from 'prop-types'

import styled from 'styled-components'
import { Tabs } from './components/tabs/Tabs'

const TabData = [
	{
		title: 'Пользователи',
		content: 'Content 1',
	},
	{
		title: 'Работа с товарами',
		content: 'Content 2',
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
