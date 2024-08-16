import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useMatch } from 'react-router-dom'

import { Loader, Error } from '../../components'

export const GenericListContainer = ({
	fetchData,
	selectData,
	TableComponent,
	addPath,
	editPath,
	dataKey,
}) => {
	const dispatch = useDispatch()
	const { [dataKey]: list, isLoading, error } = useSelector(selectData)
	const isAdd = !!useMatch(addPath)
	const isEdit = !!useMatch(editPath)
	
	useEffect(() => {

		dispatch(fetchData())
	}, [dispatch, fetchData])

	if (isLoading) {
		return <Loader fontSize='150px' />
	}

	if (error) {
		return <Error titleError={error} noAccess />
	}

	return <>{isAdd || isEdit ? <Outlet /> : <TableComponent items={list} />}</>
}

GenericListContainer.propTypes = {
	fetchData: PropTypes.func.isRequired,
	selectData: PropTypes.func.isRequired,
	TableComponent: PropTypes.elementType.isRequired,
	addPath: PropTypes.string.isRequired,
	editPath: PropTypes.string.isRequired,
	dataKey: PropTypes.string.isRequired,
}
