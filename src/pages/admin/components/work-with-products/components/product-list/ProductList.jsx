import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { ProductRow, TableRow } from './components'
import { Loader, InfiniteScrollList } from '../../../../../../components'
import { useInfiniteScroll } from '../../../../../../hooks'
// import { selectProducts } from '../../../../../../redux/selectors'
import {
	RESET_LIST_PRODUCTS,
	addProducts,
	setProducts,
} from '../../../../../../redux/actions'

import styled from 'styled-components'
import { useEffect } from 'react'

const ProductListContainer = ({ className }) => {
	const dispatch = useDispatch()
	// const products = useSelector(selectProducts)
	// const serverRequest = useServerRequest()

	useEffect(() => {
		dispatch(RESET_LIST_PRODUCTS)
	}, [dispatch])

	// const fetchProducts = async (page) => {
	// 	const response = await serverRequest('fetchProducts', null, page)

	// 	const {
	// 		error,
	// 		res: { products: newProducts, lastPage },
	// 	} = response

	// 	if (error) {
	// 		return { error }
	// 	}

	// 	if (page === 1) {
	// 		dispatch(setProducts(newProducts))
	// 	} else {
	// 		dispatch(addProducts(newProducts))
	// 	}
	// 	return { lastPage }
	// }

	const renderProductRow = (product, ref) => {
		return <ProductRow ref={ref} key={product.id} product={product} />
	}

	// const { isLoading, lastElementRef } = useInfiniteScroll(fetchProducts)

	return (
		<div className={className}>
			<TableRow />
			{/* {products[0].id !== null && (
				<InfiniteScrollList
					items={products}
					renderItem={renderProductRow}
					ref={lastElementRef}
				/>
			)}
			{isLoading && <Loader fontSize='50px' />} */}
		</div>
	)
}

export const ProductList = styled(ProductListContainer)`
	flex: 2;
	padding-left: 20px;
`

ProductListContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
