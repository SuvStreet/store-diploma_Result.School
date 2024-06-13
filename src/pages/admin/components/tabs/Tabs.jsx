import PropTypes from 'prop-types'
import { useState } from 'react'

import styled from 'styled-components'

const Tab = styled.button`
	flex: 1;
	padding: 10px;
	cursor: pointer;
	background: none;
	border: none;
	color: ${(props) => (props.active ? '#fff' : '#aaa')};
	border-bottom: ${(props) => (props.active ? '3px solid #007bff' : 'none')};

	&:hover {
		color: #fff;
	}
`

const TabContent = styled.div`
	padding: 20px;
	background-color: #282828;
	border-radius: 0 0 10px 10px;
	color: #ddd;
`

const TabsContainer = ({ className, tabs }) => {
	const [activeTab, setActiveTab] = useState(0)

	return (
		<div className={className}>
			<div className='tab-list'>
				{tabs.map((tab, index) => (
					<Tab
						key={index}
						active={activeTab === index}
						onClick={() => setActiveTab(index)}
					>
						{tab.title}
					</Tab>
				))}
			</div>
			<TabContent>{tabs[activeTab].content}</TabContent>
		</div>
	)
}

export const Tabs = styled(TabsContainer)`
	width: 100%;
	background-color: #1c1c1c;
	border-radius: 10px;
	padding: 10px;

	.tab-list {
		display: flex;
		border-bottom: 1px solid #444;
	}
`

TabsContainer.propTypes = {
	className: PropTypes.string.isRequired,
	tabs: PropTypes.array.isRequired,
}
