import { useCallback, useEffect, useState } from 'react';

export const useUsers = () => {
	const [users, setUsers] = useState([]);
  
	const fetchUsers = async () => {
		try {
			const response = await fetch(`https://reqres.in/api/users?page=2`);
			const json = await response.json();
			setUsers(json.data);
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	return {
		users,
		setUsers
	}
}

export const useDelUser = (users, setUsers) => {
	const deleteUser = useCallback(id => {
		setUsers(users.filter(user => id !== user.id));
	}, [users, setUsers])

	return {
		deleteUser
	}
}

export const useUpdateUser = (users, setUsers) => {
	const updateUser = useCallback(id => {
		setUsers(
			users.map(user => (user.id === id) ? {...user, ...users} : user)
		)
	}, [users, setUsers])

	return {
		updateUser,
	}
}
