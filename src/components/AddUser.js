import React from 'react';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import Input from 'antd/es/input';

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 18,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 18,
	},
};

const AddUser = () => {
	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Form
			{...layout}
			name="basic"
			className="login-container"
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item
				label="Email"
				name="email"
				htmlType="email"
				rules={[
					{
						required: true,
						message: 'Please input your email!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="First name"
				name="first_name"
				rules={[
					{
						required: true,
						message: 'Please input your first name!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Last name"
				name="last_name"
				rules={[
					{
						required: true,
						message: 'Please input your last naem!',
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
					AddUser
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AddUser;
