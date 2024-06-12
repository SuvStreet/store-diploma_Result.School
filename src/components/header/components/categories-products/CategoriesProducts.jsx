import PropTypes from 'prop-types'
// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import { Loader } from '../../../loader/Loader'
// import { useServerRequest } from '../../../../hooks'
// import { setCategories } from '../../../../redux/actions'
// import { selectCategories } from '../../../../redux/selectors'
import { CATEGORIES } from '../../../../constants'

import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const CategoriesProductsContainer = ({ className }) => {
	// const serverRequest = useServerRequest()
	// const dispatch = useDispatch()
	// const categories = useSelector(selectCategories)
	// const [isLoading, setIsLoading] = useState(false)

	// useEffect(() => {
	// 	// setIsLoading(true)
	// 	serverRequest('fetchCategories')
	// 		.then(({ res, error }) => {
	// 			if (error) {
	// 				return
	// 			}

	// 			dispatch(setCategories(res.categories))
	// 		})
	// 		// .finally(() => setIsLoading(false))
	// }, [serverRequest, dispatch])

	return (
		<div className={className}>
				<ul>
					{CATEGORIES.map(({ id, name }) => (
						<NavLink to={`/catalog/${id}`} key={id}>
							<li>{name}</li>
						</NavLink>
					))}
				</ul>
		</div>
	)
}

export const CategoriesProducts = styled(CategoriesProductsContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	height: 62px;

	ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		padding: 0 10px 20px 10px;
		font-weight: 500;
		font-size: 14px;
	}

	a:not(:last-child) {
		border-right: 1px solid #5e5e5e;
	}

	a {
		transition: 0.3s ease;
	}

	a:hover,
	.active {
		color: #8e65ff;
	}
`

CategoriesProductsContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
