import PropTypes from 'prop-types'
import { forwardRef } from 'react'

export const InfiniteScrollList = forwardRef(({ items, renderItem }, ref) => {
	return (
		<>
			{items.map((item, index) => {
				if (items.length === index + 1) {
					return renderItem(item, ref)
				} else {
					return renderItem(item)
				}
			})}
		</>
	)
})

InfiniteScrollList.displayName = 'InfiniteScrollList'

InfiniteScrollList.propTypes = {
	items: PropTypes.array.isRequired,
	renderItem: PropTypes.func.isRequired,
}
