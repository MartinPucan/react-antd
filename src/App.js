import React from 'react';
import UserService from './components/UserService';
import Layout from 'antd/es/layout';
import 'antd/dist/antd.css';
import './App.css';
import LoginUser from "./components/LoginUser";

const App = () => {

	return (
		<Layout>
			<div className="container">
				<UserService />
				<LoginUser />
			</div>
		</Layout>
	);
};

export default App;
