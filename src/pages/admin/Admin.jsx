import propTypes from 'prop-types'

import { Sidebar, Header, Content } from './components'

import styled from 'styled-components'

const AdminContainer = ({ className }) => {
	return (
		<div className={className}>
			<Sidebar />
			<div className='main-content'>
				<Header />
				<Content />
			</div>
		</div>
	)
}

export const Admin = styled(AdminContainer)`
	width: 100%;
	display: flex;

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
`

AdminContainer.propTypes = {
	className: propTypes.string.isRequired,
}
