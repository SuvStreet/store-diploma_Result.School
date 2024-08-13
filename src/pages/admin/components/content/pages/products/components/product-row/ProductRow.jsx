/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'

import { Button, Icon } from '../../../../../../../../components'

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const ProductRowContainer = ({ item, index }) => {
	const navigate = useNavigate()
	const { images, name, subCategoryId, variants } = item

	const handelEditClick = () => {
		navigate(`edit/${item.id}`)
	}

	const handelRemoveClick = () => {
		console.log('remove :>> ', item.id)
	}

	return (
		<>
			<div className='cell'>{index + 1}</div>
			<div className='cell'>
				<img src={images[0]} alt={name} width='50' height='50' />
			</div>
			<div className='cell prompt' title={name}>
				{name}
			</div>
			<div className='cell prompt' title={subCategoryId.name}>
				{subCategoryId.name}
			</div>
			<div className='cell'>
				{variants.map((variant, index) => (
					<div key={variant.id}>{index + 1}</div>
				))}
			</div>
			<div className='cell'>
				{variants.map((variant) => (
					<div key={variant.id}>{variant.quantity}</div>
				))}
			</div>
			<div className='cell'>
				{variants.map((variant) => (
					<div key={variant.id}>{variant.price}</div>
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

export const ProductRow = styled(ProductRowContainer)``

ProductRow.propTypes = {
	item: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
}
