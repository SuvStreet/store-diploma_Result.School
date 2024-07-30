import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { useInfiniteScroll, useServerRequest } from '../../hooks'
import { Error, InfiniteScrollList, Loader } from '../../components'
import { addProducts, setProducts } from '../../redux/actions'
import { CardProduct } from './components'

import styled from 'styled-components'

const ProductsContainer = ({ className }) => {
	const [titleError, setTitleError] = useState('')
	const { productsId } = useParams()
	const dispatch = useDispatch()
	const serverRequest = useServerRequest()

	const fetchProducts = async (page) => {
		const response = await serverRequest('fetchProducts', productsId, page)

		const {
			error,
			res: { products: newProducts, lastPage },
		} = response

		if (error) {
			setTitleError(error)
			return { error }
		}

		if (page === 1) {
			dispatch(setProducts(newProducts))
		} else {
			dispatch(addProducts(newProducts))
		}

		return { lastPage }
	}

	const { isLoading, lastElementRef } = useInfiniteScroll(fetchProducts)

	const renderProductRow = (product, ref) => {
		const { name, description, price, imageUrl } = product

		return (
			<Link to={`/product/${product.id}`} key={product.id}>
				<CardProduct
					ref={ref}
					product={product}
					name={name}
					description={description}
					price={price}
					imageUrl={imageUrl}
				/>
			</Link>
		)
	}

	if (isLoading) {
		return <Loader fontSize='150px' />
	}

	if (titleError) {
		return <Error titleError={titleError} spin />
	}

	return (
		<div className={className}>
			<InfiniteScrollList
				items={[]}
				renderItem={renderProductRow}
				ref={lastElementRef}
			/>
		</div>
	)
}

export const Products = styled(ProductsContainer)`
	width: 100%;
`

ProductsContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
