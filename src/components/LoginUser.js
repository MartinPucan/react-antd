import React, { useReducer } from "react";
import { Form, Input, Button } from 'antd';
import { login } from '../utils/login';

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 13 }
};

const tailLayout = {
	wrapperCol: { offset: 6, span: 13 },
};

function loginReducer(state, action) {
	switch (action.type) {
		case 'field': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'login' : {
			return {
				...state,
				isLoading: true,
				isLoggedIn: false,
				error: ''
			};
		}
		case 'success': {
			return {
				...state,
				isLoggedIn: true
			};
		}
		case 'error': {
			return {
				...state,
				error: "Incorrect username or password!",
				isLoading: false,
				username: '',
				password: ''
			};
		}
		case 'logout': {
			return {
				...state,
				isLoggedIn: false,
				username: '',
				password: ''
			};
		}
		default:
			break;
	}

	return state;
}

const initialState = {
	username: '',
	password: '',
	isLoading: false,
	error: '',
	isLoggedIn: false
}

const LoginUser = () => {
	const [state, dispatch] = useReducer(loginReducer, initialState);
	const { username, password, isLoading, error, isLoggedIn } = state;

	const onSubmit = async e => {
		e.preventDefault();
		dispatch({ type: 'login' });

		try {
			await login({ username, password });
			dispatch({ type: 'success' });
		} catch (error) {
			dispatch({ type: 'error' });
		}
	}

	return (
		<div className="login-container">
			{isLoggedIn ? (
				<>
					<h1>Welcome {username}!</h1>
					<button onClick={() => dispatch({ type: 'logout' })}>
						Log Out
					</button>
				</>
			) : (
			<Form
				{...layout}
				name="basic"
				initialValues={{
					remember: true,
				}}
				onSubmit={onSubmit}
			>
				{error && <p className="error">{error}</p>}
				<p>Please Login</p>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]}
				>
					<Input
						value={username}
						onChange={e =>
							dispatch({
								type: 'field',
								field: 'username',
								value: e.currentTarget.value
							})
						}
					/>
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password
						autoComplete="new-password"
						value={password}
						onChange={e =>
							dispatch({
								type: 'field',
								field: 'password',
								value: e.currentTarget.value
							})
						}
					/>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button
						type="primary"
						htmlType="submit"
						disabled={isLoading}
					>
						{isLoading ? 'Logging in...' : 'Log In'}
					</Button>
				</Form.Item>
			</Form>
			)}
		</div>
	);
};

export default LoginUser;
