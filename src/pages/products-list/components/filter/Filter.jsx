import PropTypes from 'prop-types'

import styled from 'styled-components'

const FilterContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className='filter-container'>
				<label className='label'>
					<span>По названию</span>
					<input type='checkbox' />
				</label>

				{/* < name='По цене' />
				< name='По рейтингу' /> */}
			</div>
		</div>
	)
}

export const Filter = styled(FilterContainer)`
	.filter-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.label {
		display: flex;
		align-items: center;
		gap: 5px;
	}
`

FilterContainer.propTypes = {
	className: PropTypes.string,
}
