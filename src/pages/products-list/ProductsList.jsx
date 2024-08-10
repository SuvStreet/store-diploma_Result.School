import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useMatch, useMatches, useParams } from 'react-router-dom'

import { useInfiniteScroll } from '../../hooks'
import { Error, InfiniteScrollList, Loader } from '../../components'
import { addProducts, getProductsList, setProducts } from '../../redux/actions'
import { CardProduct } from './components'

import styled from 'styled-components'
import { selectProductsList } from '../../redux/selectors'

const ProductsListContainer = ({ className }) => {
	const { subCategoryId } = useParams()
	const dispatch = useDispatch()
	const { list, isLoading, error } = useSelector(selectProductsList)

	useEffect(() => {
		dispatch(getProductsList(subCategoryId))
	}, [dispatch, subCategoryId])

	// const serverRequest = useServerRequest()

	// const fetchProducts = async (page) => {
	// 	const response = await serverRequest('fetchProducts', productsId, page)

	// 	const {
	// 		error,
	// 		res: { products: newProducts, lastPage },
	// 	} = response

	// 	if (error) {
	// 		setTitleError(error)
	// 		return { error }
	// 	}

	// 	if (page === 1) {
	// 		dispatch(setProducts(newProducts))
	// 	} else {
	// 		dispatch(addProducts(newProducts))
	// 	}

	// 	return { lastPage }
	// }

	// const { isLoading, lastElementRef } = useInfiniteScroll(fetchProducts)

	const renderProductRow = (product, ref) => {
		return (
			<Link to={`/products/${product.id}`} key={product.id}>
				<CardProduct
					ref={ref}
					product={product}
				/>
			</Link>
		)
	}

	if (isLoading) {
		return <Loader fontSize='150px' />
	}

	if (error) {
		return <Error titleError={error} spin />
	}

	return (
		<div className={className}>
			<InfiniteScrollList
				items={list}
				renderItem={renderProductRow}
				// ref={lastElementRef}
			/>
		</div>
	)
}

export const ProductsList = styled(ProductsListContainer)`
	width: 100%;
`

ProductsListContainer.propTypes = {
	className: PropTypes.string.isRequired,
}