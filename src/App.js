import React, {useEffect, useState} from 'react';
import Table from 'antd/es/table';
import Avatar from 'antd/es/avatar';
import Divider from 'antd/es/divider';
import 'antd/dist/antd.css';
import './App.css';
import axios from 'axios';

const App = () => {

	const [ users, setUsers ] = useState([]);
	const apiURL = 'https://reqres.in/api/users?page=2';

	useEffect(() => {
		axios.get(apiURL)
			.then( response => {
				setUsers(response.data.data);
			})
			.catch(error => {
				console.log(error);
			})
	}, [])


	const columns = [{
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
		title: 'Action',
		key: 'action',
		render: (text, record) => (
			<span>
      <a href="#">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="#">Delete</a>
      <Divider type="vertical" />
    </span>
		),
	}];

	console.log(users);


	return (
		<div className="container">
			<Table
				columns={columns}
				dataSource={users}
				title={() => 'Users'}
				pagination={{ pageSize: 4 }}
				rowKey="id"
				bordered />
		</div>
	);
};

export default App;
