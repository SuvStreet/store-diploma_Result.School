import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { useServerRequest } from '../../hooks'
import { Button, Error, Icon, Loader } from '../../components'
import { setProducts } from '../../redux/actions'
import { selectProducts } from '../../redux/selectors'

import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'

const ProductsContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [titleError, setTitleError] = useState('')
	const { productsId } = useParams()
	const dispatch = useDispatch()
	const products = useSelector(selectProducts)
	const serverRequest = useServerRequest()

	useEffect(() => {
		// if (!products[0].id) {
			setIsLoading(true)
			serverRequest('fetchProducts', productsId)
				.then(({ res, error }) => {
					if (error) {
						setTitleError(error)
						return
					}

					dispatch(setProducts(res.products))

					console.log('res', res)
				})
				.finally(() => setIsLoading(false))
		// }
	}, [productsId, serverRequest, dispatch])

	console.log('products', products)

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
					<div className='wrapper'>
						<div className='img-container'>
							<img src={imageUrl} alt={name} />
						</div>
						<div className='info-container'>
							<div className='info-product'>
								<div className='title-product'>
									<p>{name}</p>
								</div>
								<div className='description-product'>
									<p>{description}</p>
								</div>
							</div>
							<div className='price-button'>
								<div className='price-product'>{price} ₽</div>
								<div className='button-product'>
									<Button>
										<Icon iconCode={faHeart} fontSize='20px'></Icon>
										<p>В избранное</p>
									</Button>
									<Button>
										<Icon iconCode={faCartShopping} fontSize='20px'></Icon>
										<p>В корзину</p>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}

export const Products = styled(ProductsContainer)`
	width: 100%;

	.wrapper {
		width: 100%;
		height: 200px;
		display: flex;
		padding: 20px;
		gap: 20px;
		border-radius: 10px;
		transition: 0.3s ease;

		&:hover {
			box-shadow: 0 0 5px 5px #5e5e5e;
		}

		.img-container {
			display: flex;
			justify-content: center;
			max-width: 200px;
			width: 100%;

			img {
				border-radius: 10px;
				width: 100%;
				object-fit: cover;
			}
		}

		.info-container {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.info-product {
				display: flex;
				flex-direction: column;
				align-items: start;
				width: 100%;

				.title-product {
					font-weight: 500;
					font-size: 20px;
				}

				.description-product {
					font-weight: 400;
					font-size: 14px;
					color: #5e5e5e;
				}
			}

			.price-button {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 100%;

				.price-product {
					text-align: end;
					font-weight: 500;
					font-size: 35px;
				}

				.button-product {
					display: flex;
					justify-content: space-between;
					gap: 10px;

					p {
						display: none;
					}
				}
			}
		}
	}
`

ProductsContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
