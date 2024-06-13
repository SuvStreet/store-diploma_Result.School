import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { useServerRequest } from '../../hooks'
import { Error, Loader } from '../../components'
import { setProducts } from '../../redux/actions'
import { selectProducts } from '../../redux/selectors'
import { CardProduct } from './components'

import styled from 'styled-components'

const ProductsContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [titleError, setTitleError] = useState('')
	const { productsId } = useParams()
	const dispatch = useDispatch()
	const products = useSelector(selectProducts)
	const serverRequest = useServerRequest()

	useEffect(() => {
		setIsLoading(true)
		serverRequest('fetchProducts', productsId)
			.then(({ res, error }) => {
				if (error) {
					setTitleError(error)
					return
				}

				dispatch(setProducts(res.products))
			})
			.finally(() => setIsLoading(false))
	}, [productsId, serverRequest, dispatch])

	if (isLoading) {
		return <Loader fontSize='150px' />
	}

	if (titleError) {
		return <Error titleError={titleError} spin />
	}

	return (
		<div className={className}>
			{products.map(({ id, name, description, price, imageUrl }) => (
				<Link to={`/product/${id}`} key={id}>
					<CardProduct
						name={name}
						description={description}
						price={price}
						imageUrl={imageUrl}
					/>
				</Link>
			))}
		</div>
	)
}

export const Products = styled(ProductsContainer)`
	width: 100%;
`

ProductsContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
