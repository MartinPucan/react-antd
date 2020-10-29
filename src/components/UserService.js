import React, { useEffect, useState } from 'react';
import EditUser from './EditUser';
import Modal from 'antd/es/modal';
import Table from 'antd/es/table';
import Avatar from 'antd/es/avatar';
import Divider from 'antd/es/divider';
import Button from 'antd/es/button';

export default function UserService() {
	const [ users, setUsers ] = useState([]);
	const [ currentUser, setCurrentUser ] = useState([]);
	const [ editing, setEditing ] = useState(false);

	const fetchUsers = async () => {
		try {
			const response = await fetch(`https://reqres.in/api/users?page=2`);
			const { data } = await response.json();
			setUsers(data);
		}
		catch(error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	const deleteUser = id => {
		setEditing(false);
		setUsers(users.filter(user => id !== user.id));
	}

	const detailUser = id => {
		setEditing(false);
		const userById = users.find(user => id === user.id);
		Modal.info({
			title: `${userById.first_name} ${userById.last_name}`,
			content: (
				<section>
					<p><strong>Id:</strong> {userById.id}</p>
					<p><strong>Email:</strong> {userById.email}</p>
				</section>
			),
			onOk() {},
		});
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false);
		setUsers( users.map( user => (
			user.id === id ? updatedUser : user)
		));
	}

	const editRow = user => {
		setEditing(true);
		setCurrentUser({
			id: user.id,
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
			avatar: user.avatar
		});
	}

	const columns = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id'
	}, {
		title: 'Avatar',
		dataIndex: 'avatar',
		render: url => <Avatar size="small" src={url} />,
	}, {
		title: 'Email',
		dataIndex: 'email',
	}, {
		title: 'First name',
		dataIndex: 'first_name',
	}, {
		title: 'Last name',
		dataIndex: 'last_name',
	}, {
		title: 'Actions',
		render: (record) => (
			<span>
				<Button size="small" onClick={() => detailUser(record.id) }>
					Detail
				</Button>
				<Divider type="vertical" />
				<Button size="small" onClick={() => editRow(record)}>
					Edit
				</Button>
				<Divider type="vertical" />
				<Button type="danger" size="small" onClick={() => deleteUser(record.id)}>
					Delete
				</Button>
    	</span>
		)
	}];

	return (
		<>
		<Table
			columns={columns}
			rowKey="id"
			dataSource={users}
			title={() => 'Users'}
			pagination={{ pageSize: 10 }}
			bordered
		/>
		<div>
			{editing ? (
				<>
					<EditUser
						editing={editing}
						setEditing={setEditing}
						currentUser={currentUser}
						updateUser={updateUser}
					/>
				</>
			) : <></> }
		</div>
		</>
	);
};
