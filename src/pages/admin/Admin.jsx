import propTypes from 'prop-types'

import styled from 'styled-components'

const AdminContainer = ({ className }) => {
	return <div className={className}>Admin</div>
}

export const Admin = styled(AdminContainer)``

AdminContainer.propTypes = {
	className: propTypes.string.isRequired,
}
