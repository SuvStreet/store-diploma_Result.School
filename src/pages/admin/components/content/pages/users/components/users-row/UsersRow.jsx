import { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Icon, Select } from '../../../../../../../../components'
import { transformDate } from '../../../../../../../../utils'
import { useSelector } from 'react-redux'
import { selectRoles } from '../../../../../../../../redux/selectors'

import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const UsersRowContainer = ({ item, index }) => {
	const roles = useSelector(selectRoles)

	const { login, email, imgUserUrl, roleId, createdAt } = item

	const [selectedRoleId, setSelectedRoleId] = useState(String(roleId))

	const onChange = (newRoleId) => {
		setSelectedRoleId(newRoleId.target.value)
	}

	const isRoleChanged = selectedRoleId !== String(roleId)

	const handleSaveClick = () => {
		if (isRoleChanged) {
			// Логика сохранения новой роли
			console.log(`Saving new role: ${selectedRoleId} for user: ${item.id}`)
		}
	}

	return (
		<>
			<div className='cell'>{index + 1}</div>
			<div className='cell'>
				<img src={imgUserUrl} alt={login} width='50' height='50' />
			</div>
			<div className='cell prompt' title={email}>
				{email}
			</div>
			<div className='cell'>{login}</div>
			<div className='cell'>
				<Select name='role' list={roles} value={selectedRoleId} onChange={onChange} />
			</div>
			<div className='cell'>{transformDate(createdAt)}</div>
			<div className='cell buttons'>
				<Button className='save' onClick={handleSaveClick} disabled={!isRoleChanged}>
					<Icon iconCode={faFloppyDisk} cursor='default' fontSize='1rem' />
				</Button>
			</div>
		</>
	)
}

export const UsersRow = styled(UsersRowContainer)``

UsersRowContainer.propTypes = {
	item: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
}
