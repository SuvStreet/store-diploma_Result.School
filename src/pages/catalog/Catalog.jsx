import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { Loader } from '../../components'
import { useServerRequest } from '../../hooks'
import { setCategory } from '../../redux/actions'
import { selectCategory } from '../../redux/selectors'

import styled from 'styled-components'

const CatalogContainer = ({ className }) => {
	const serverRequest = useServerRequest()
	const dispatch = useDispatch()
	const category = useSelector(selectCategory)
	const { id } = useParams()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (!category.id || category.id !== Number(id)) {
			setIsLoading(true)
			serverRequest('fetchCategory', id)
				.then(({ res, error }) => {
					if (error) {
						console.error('Error message:', error)
						return
					}

					dispatch(setCategory(res.category))
				})
				.finally(() => setIsLoading(false))
		}
	}, [id, serverRequest, dispatch, category.id])

	if (isLoading) {
		return <Loader fontSize='150px' />
	}

	return (
		<div className={className}>
			{category.catalog.map(({ id, name }) => (
				<div className='wrapper' key={id}>
					<Link to={`products`} key={id}>
						<div className='card'>
							<div className='card__img'>
								<img src='https://via.placeholder.com/300' />
							</div>
							<div className='card__text'>
								<h2 className='product-title'>{name}</h2>
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
		max-width: 200px;
	}

	.card {
		width: 100%;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
		padding: 10px;
		cursor: pointer;
	}

	.card__img {
		img {
			width: 100%;
			border-radius: 10px;
			object-fit: cover;
		}
	}

	.card__text {
	}
`

CatalogContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
