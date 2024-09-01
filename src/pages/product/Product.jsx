import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Error, Loader } from '../../components'
import { getProductsList } from '../../redux/actions'
import { selectProductsList } from '../../redux/selectors'
import { Card } from './components'

import styled from 'styled-components'

const ProductContainer = ({ className }) => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const { products, error } = useSelector(selectProductsList)

	useEffect(() => {
		if (!products.length) {
			dispatch(getProductsList())
		}
	}, [dispatch, products])

	if (!products.length) {
		return <Loader fontSize='150px' />
	}

	if (error) {
		return <Error titleError={error} noAccess />
	}

	return (
		<div className={className}>
			<Card product={products.find((product) => product.id === id)} />
			{/* <Comments /> */}
		</div>
	)
}

export const Product = styled(ProductContainer)`
	width: 100%;
`

ProductContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
