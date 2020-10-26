import React, { useEffect, useState } from 'react';
import Table from 'antd/es/table';
import Avatar from 'antd/es/avatar';
import Divider from 'antd/es/divider';
import Button from 'antd/es/button';
import 'antd/dist/antd.css';

export default function User() {
	const [ users, setUsers ] = useState([]);
	const [ editing, setEditing ] = useState(false);

	const fetchUsers = async () => {
		try {
			const response = await fetch(`https://reqres.in/api/users?page=2`);
			const json = await response.json();
			setUsers(json.data);
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
				<Button size="small">Edit</Button>
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
