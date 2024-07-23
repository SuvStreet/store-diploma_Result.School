import PropTypes from 'prop-types'

import styled from 'styled-components'

const TableRowContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className='id'>id</div>
			<div className='photo'>Фото</div>
			<div className='name'>Наименование</div>
			<div className='category'>Категория</div>
			<div className='price'>Стоимость</div>
		</div>
	)
}

export const TableRow = styled(TableRowContainer)`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	box-shadow: 0 5px 5px -5px #5e5e5e;

	.id {
		margin-left: 10px;
	}

	.photo {
		flex: 1;
	}

	.name {
		flex: 2;
	}

	.category {
		flex: 1;
	}

	.price {
		flex: 1;
	}
`

TableRowContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
