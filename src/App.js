import React, { useMemo } from 'react';
import { useUsers , useDelUser } from './components/UserService';
import Layout from 'antd/es/layout';
import 'antd/dist/antd.css';
import './App.css';
// import FetchUser from "./components/FetchUser";
import EditUser from "./components/EditUser";
import Table from 'antd/es/table';
import Avatar from 'antd/es/avatar';
import Divider from 'antd/es/divider';
import Button from 'antd/es/button';
// import LoginUser from "./components/LoginUser";

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
		}];

	const getTableCols = (users, setUsers, deleteUser ) => {
		let allCols = [...columns];
		allCols = [...allCols, {
				title: 'Actions',
				render: (record) => (
					<span>
						<EditUser users={users} setUsers={setUsers} user={record}>
							<Button size="small">
								Edit
							</Button>
						</EditUser>
						<Divider type="vertical" />
						<Button type="danger" size="small" onClick={() => deleteUser(record.id)}>
							Delete
						</Button>
				</span>
				),
		}];

		return allCols;
	}


const App = () => {
	const { users, setUsers } = useUsers();
	const { deleteUser } = useDelUser(users, setUsers);

	const columns = useMemo(() =>
		getTableCols(users, setUsers, deleteUser),
		[ users, setUsers, deleteUser]
	);

	return (
		<Layout>
			<div className="container">
				<Table
					columns={columns}
					rowKey="id"
					dataSource={users}
					title={() => 'Users'}
					pagination={{ pageSize: 3 }}
					bordered
				/>
			</div>
		</Layout>
	);
};

export default App;
