import React, { useEffect, useState } from 'react';
import Table from 'antd/es/table';
import Avatar from 'antd/es/avatar';
import Divider from 'antd/es/divider';
import Button from 'antd/es/button';
import 'antd/dist/antd.css';

export default function User() {
	const [ users, setUsers ] = useState([]);

	useEffect(() => {
		async function fetchUsers() {
			try {
				const response = await fetch(`https://reqres.in/api/users?page=2`);
				const json = await response.json();
				setUsers(json.data);
			}
				catch(error) {}
		}
		fetchUsers();
	}, [])

	const columns = [
	{
		title: 'Avatar',
		dataIndex: 'avatar',
		render: url => <Avatar size="small" src={url} />,
	},
	{
		title: 'Email',
		dataIndex: 'email',
	},
	{
		title: 'First name',
		dataIndex: 'first_name',
	},
	{
		title: 'Last name',
		dataIndex: 'last_name',
	},
	{
		title: 'Actions',
		key: 'actions',
		render: () => (
			<span>
				<Button size="small">Edit</Button>
				<Divider type="vertical" />
				<Button type="danger" size="small">Delete</Button>
    	</span>
		),
	}];

	return (
		<div className="container">
			<Table
				columns={columns}
				dataSource={users}
				title={() => 'Users'}
				pagination={{ pageSize: 10 }}
				rowKey="id"
				bordered
			/>
		</div>
	);
};
