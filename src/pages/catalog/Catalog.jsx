import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useMatch, useParams } from 'react-router-dom'

import { H2, Loader } from '../../components'
import { useServerRequest } from '../../hooks'
import { setCategory } from '../../redux/actions'
import { selectCategory } from '../../redux/selectors'

import styled from 'styled-components'

const CatalogContainer = ({ className }) => {
	const serverRequest = useServerRequest()
	const dispatch = useDispatch()
	const category = useSelector(selectCategory)
	const { catalogId } = useParams()
	const [isLoading, setIsLoading] = useState(false)
	const productsList = !!useMatch('/catalog/:catalogId/products/:productsId')

	useEffect(() => {
		if (!productsList && (!category.id || category.id !== Number(catalogId))) {
			setIsLoading(true)
			serverRequest('fetchCategory', catalogId)
				.then(({ res, error }) => {
					if (error) {
						console.error('Error message:', error)
						return
					}

					dispatch(setCategory(res.category))
				})
				.finally(() => setIsLoading(false))
		}
	}, [catalogId, serverRequest, dispatch, category.id, productsList])

	if (isLoading) {
		return <Loader fontSize='150px' />
	}

	if (productsList) {
		return <Outlet />
	}

	return (
		<div className={className}>
			{category.catalog.map(({ id, name, image_url }) => (
				<div className='wrapper' key={id}>
					<Link to={`products/${id}`} key={id}>
						<div className='card'>
							<div className='card__img'>
								<img src={image_url} />
							</div>
							<div className='card__text'>
								<H2 className='product-title'>{name}</H2>
							</div>
						</div>
					</Link>
				</div>
			))}
		</div>
	)
}

export const Catalog = styled(CatalogContainer)`
	display: flex;
	gap: 10px;
	width: 100%;

	.wrapper {
	}

	.card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		line-height: 2rem;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
		padding: 10px;
		cursor: pointer;
	}

	.card__img {
		max-width: 250px;
		height: 230px;
		overflow: hidden;

		img {
			max-width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 10px;
		}
	}

	.card__text {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h2 {
		margin: 0;
		margin-top: 10px;
		font-size: 1.2rem;
	}
`

CatalogContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
