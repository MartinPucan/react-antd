import React, { useEffect, useState } from 'react';
import Modal from 'antd/es/modal';
import Table from 'antd/es/table';
import Avatar from 'antd/es/avatar';
import Divider from 'antd/es/divider';
import Button from 'antd/es/button';

export default function UserService() {
	const [ users, setUsers ] = useState([]);

	const fetchUsers = async () => {
		try {
			const response = await fetch(`https://reqres.in/api/users?page=2`);
			const { data} = await response.json();
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
		setUsers(users.filter(user => id !== user.id));
	}

	const editUser = id => {
		const userById = users.find(user => id === user.id);
		console.log(userById);
	}

	const detailUser = id => {
		const userById = users.find(user => id === user.id);
		Modal.info({
			title: `${userById.first_name} ${userById.last_name}`,
			content: (
				<div>
					<p><strong>Id:</strong> {userById.id}</p>
					<p><strong>Email:</strong> {userById.email}</p>
				</div>
			),
			onOk() {},
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
				<Button size="small" onClick={() => editUser(record.id)}>
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
		<Table
			columns={columns}
			rowKey="id"
			dataSource={users}
			title={() => 'Users'}
			pagination={{ pageSize: 10 }}
			bordered
		/>
	);
};
