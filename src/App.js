import React from 'react';
import User from './components/User';
import Layout from 'antd/es/layout';
import 'antd/dist/antd.css';
import './App.css';
// import LoginUser from "./components/LoginUser";

const App = () => {

	return (
		<Layout>
			<div className="container">
				<User />
				{/*<LoginUser />*/}
			</div>
		</Layout>
	);
};

export default App;
