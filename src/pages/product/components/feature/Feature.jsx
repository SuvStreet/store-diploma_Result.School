import PropTypes from 'prop-types'

import styled from 'styled-components'

const FeatureContainer = ({ className, features }) => {
	return (
		<div className={className}>
			<h4 className='feature__title'>Характеристики:</h4>

			<div className='feature__data'>
				{Object.entries(features).map(([key, value]) => (
					<div className='data' key={key}>
						<p className='data__name'>{key}</p>
						<p className='data__text'>{value}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export const Feature = styled(FeatureContainer)`
	width: 100%;
	text-align: start;
	/* border: 1px solid #5e5e5e; */
	/* border-radius: 10px; */
	padding: 20px;

	.feature__title {
		margin-bottom: 20px;
	}

	.feature__data {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.data{
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
			gap: 15px;
		}

		.data__name {
			flex: 2;
			font-weight: 700;
			color: #5e5e5e;
			text-decoration: dotted underline;
		}

		.data__text {
			flex: 1;
		}
	}
`

FeatureContainer.propTypes = {
	className: PropTypes.string,
}
