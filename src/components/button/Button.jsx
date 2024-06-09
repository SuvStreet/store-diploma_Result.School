import PropsType from 'prop-types'

import s from 'styled-components'

const ButtonContainer = ({ children, className, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	)
}

export const Button = s(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	width: ${({ width }) => width || '100%'};
	height: ${({ height }) => height || '30px'};
	background-color: ${({ solid }) => solid || 'transparent'};
	border: 1px solid #5e5e5e;
	border-radius: 10px;
	color: white;
	transition: 0.3s;

	&:hover {
		cursor: pointer;
		background-color: #5e5e5e;
	}

	&:disabled {
		cursor: not-allowed;
		background-color: #5e5e5e;
	}
`

ButtonContainer.propTypes = {
	children: PropsType.node.isRequired,
	className: PropsType.string.isRequired,
}