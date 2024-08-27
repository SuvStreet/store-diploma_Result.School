import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Error, Loader } from '../../components'
import { getProduct } from '../../redux/actions'
import { selectProduct, selectProductError, selectProductIsLoading } from '../../redux/selectors'
import { Card } from './components'

import styled from 'styled-components'

const ProductContainer = ({ className }) => {
	const dispatch = useDispatch()
	const { id } = useParams()
	// const product = useSelector(selectProduct)
	// const isLoading = useSelector(selectProductIsLoading)
	// const error = useSelector(selectProductError)

	// useEffect(() => {
	// 	dispatch(getProduct(id))
	// }, [dispatch, id])

	if (isLoading) {
		return <Loader fontSize='150px' />
	}

	if (error) {
		return <Error titleError={error} noAccess />
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
