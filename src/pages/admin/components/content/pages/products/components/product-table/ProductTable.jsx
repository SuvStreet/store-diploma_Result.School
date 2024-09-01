import PropTypes from 'prop-types'

import { Table } from '../../../../../../../../components'
import { ProductRow } from '../product-row/ProductRow'

import styled from 'styled-components'

const ProductTableContainer = ({ items }) => {
	const titlesAddButton = 'новый товар'

	const headers = [
		'ID',
		'Фото',
		'Наименование',
		'Категория',
		'Количество',
		'Цена',
		'Действия',
	]

	return (
		<Table
			titlesAddButton={titlesAddButton}
			headers={headers}
			data={items}
			renderRow={(item, index) => <ProductRow key={item.id} item={item} index={index} />}
		/>
	)
}

export const ProductTable = styled(ProductTableContainer)``

ProductTableContainer.propTypes = {
	items: PropTypes.array.isRequired,
}
