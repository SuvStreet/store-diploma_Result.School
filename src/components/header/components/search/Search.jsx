import PropTypes from 'prop-types'
import { useState } from 'react'

import { Icon } from '../../../icon/Icon'
import { Input } from '../../../input/Input'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const SearchContainer = ({ className }) => {
	const [searchItem, setSearchItem] = useState('')

	const onChange = ({ target: { value } }) => {
		setSearchItem(value)
	}

	return (
		<div className={className}>
			<Input placeholder='Что ищешь?' value={searchItem} onChange={onChange} />
			<Icon iconCode={faMagnifyingGlass} fontSize='25px' />
		</div>
	)
}

export const Search = styled(SearchContainer)`
	display: flex;
	align-items: center;
	width: 100%;
	margin: 0 20px;
	position: relative;

	& input {
		margin: 0;
		padding-right: 45px;

		&::placeholder {
			color: #5e5e5e;
		}

		&:focus + svg {
			color: white;
		}
	}

	svg {
		position: absolute;
		right: 10px;
		color: #5e5e5e;

		&:hover {
			cursor: text;
		}
	}
`

SearchContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
