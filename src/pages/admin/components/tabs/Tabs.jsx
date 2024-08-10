import PropTypes from 'prop-types'
import { NavLink, useLocation, Outlet } from 'react-router-dom'

import styled from 'styled-components'
import { Error } from '../../../../components'

const TabsContainer = ({ className, tabs }) => {
	const { pathname } = useLocation()

	if (pathname !== '/admin/users' && pathname !== '/admin/products/add') {
		return <Error titleError='Страница не найдена' spin></Error>
	}

	return (
		<div className={className}>
			<div className='tab-list'>
				{tabs.map((tab, index) => (
					<NavLink className='tab' to={tab.path} key={index}>
						{tab.title}
					</NavLink>
				))}
			</div>
			<div className='tab-content'>
				<Outlet />
			</div>
		</div>
	)
}

export const Tabs = styled(TabsContainer)`
	width: 100%;
	background-color: #1c1c1c;
	border-radius: 10px;

	.tab-list {
		display: flex;
		border-bottom: 1px solid #444;

		.tab {
			flex: 1;
			padding: 10px;
			cursor: pointer;
			background: none;
			border: none;
			color: #aaa;
			border-bottom: none;
		}

		.tab.active {
			color: #fff;
			border-bottom: 3px solid #007bff;
		}

		&:hover {
			color: #fff;
		}
	}

	.tab-content {
		padding: 20px;
		background-color: #282828;
		border-radius: 0 0 10px 10px;
		color: #ddd;
	}
`

TabsContainer.propTypes = {
	className: PropTypes.string.isRequired,
	tabs: PropTypes.array.isRequired,
}
