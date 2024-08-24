import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { Button, Icon } from '../../../../../../../../components'

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const CategoriesRowContainer = ({ item, index }) => {
	const navigate = useNavigate()
	const { name, subcategories } = item

	const handelEditClick = () => {
		navigate(`edit/${item.id}`)
	}

	const handelRemoveClick = () => {
		console.log('remove :>> ', item.id)
	}

	return (
		<>
			<div className='cell'>{index + 1}</div>
			<div className='cell prompt' title={name}>
				{name}
			</div>
			<div className='cell'>
				{subcategories.map((subcategories) => (
					<div key={subcategories.id} className='cell prompt' title={subcategories.name}>
						{subcategories.name}
					</div>
				))}
			</div>
			<div className='cell'>
				{subcategories.map((subcategories) => (
					<div key={subcategories.id} className='cell'>
						{subcategories.products.reduce((acc, product) => acc + product.variants, 0)}
					</div>
				))}
			</div>
			<div className='cell buttons'>
				<Button className='edit' onClick={() => handelEditClick()}>
					<Icon iconCode={faEdit} fontSize='1rem' />
				</Button>
				<Button className='delete' solid='red' onClick={() => handelRemoveClick()}>
					<Icon iconCode={faTrash} fontSize='1rem' />
				</Button>
			</div>
		</>
	)
}

export const CategoriesRow = styled(CategoriesRowContainer)``

CategoriesRowContainer.propTypes = {
	item: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
}
