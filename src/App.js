import React from 'react';
import User from './components/User';
import LoginUser from './components/LoginUser';
// import AddUser from './components/AddUser';
// import Button from 'antd/es/button';
import 'antd/dist/antd.css';
import './App.css';

const App = () => {

	return (
		<div className="container">
			{/*<AddUser*/}
			{/*	// users={users}*/}
			{/*	// setUsers={setUsers}*/}
			{/*	// user={record}*/}
			{/*>*/}
			{/*	<Button>Add User</Button>*/}
			{/*</AddUser>*/}

			<User />
			{/*<LoginUser />*/}
		</div>
	);
};

export default App;
