import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Error, Loader } from '../../components'
import { getProduct } from '../../redux/actions'
import { selectProduct } from '../../redux/selectors'
import { Card } from './components'

import styled from 'styled-components'

const ProductContainer = ({ className }) => {
	const dispatch = useDispatch()
	const { productsId } = useParams()
	const product = useSelector(selectProduct)

	useEffect(() => {
			dispatch(getProduct(productsId))
	}, [dispatch, productsId])

	if (!product.id || product.isLoading) {
		return <Loader fontSize='150px' />
	}

	if (product.error) {
		return <Error titleError={product.error} noAccess />
	}

	return (
		<div className={className}>
			<Card product={product} />
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
