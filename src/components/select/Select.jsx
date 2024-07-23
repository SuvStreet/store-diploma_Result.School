import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import styled from 'styled-components'

const SelectContainer = forwardRef(({ className, list, name, setValue }, ref) => {
	const onChange = ({ target: { value } }) => {
		setValue(name, Number(value))
	}

	return (
		<select
			name={name}
			className={className}
			onChange={onChange}
			ref={ref}
		>
			{list.map(({ id, name }) => (
				<option key={id} value={id}>
					{name}
				</option>
			))}
		</select>
	)
})

SelectContainer.displayName = 'SelectContainer'

export const Select = styled(SelectContainer)`
	width: 100%;
	height: 40px;
	font-size: 1.2rem;
	margin-right: 5px;
	background-color: transparent;
	border-radius: 5px;
	border: 1px solid #5e5e5e;
	color: #fff;
	cursor: pointer;
	margin-bottom: 10px;

	& option {
		color: #fff;
		background-color: #242424;
	}
`

SelectContainer.propTypes = {
	className: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
}
