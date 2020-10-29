import React, { useState, useEffect } from 'react';
// import Form from 'antd/es/form';
// import Input from 'antd/es/input';
// import Button from 'antd/es/button';

const EditUser = props => {
	const [ user, setUser ] = useState(props.currentUser)

	useEffect(() => {
			setUser(props.currentUser);
		},[ props ]
	);

	const onSubmit = e => {
		e.preventDefault()
		props.updateUser(user.id, user)
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value });
	}

	return (
		<form onSubmit={onSubmit} className="form-container">
			<div className="inputs">
				<input type="email" name="email" value={user.email} onChange={handleInputChange} />
				<input type="text" name="first_name" value={user.first_name} onChange={handleInputChange} />
				<input type="text" name="last_name" value={user.last_name} onChange={handleInputChange} />
			</div>
			<div className="submit">
				<button onClick={() => props.setEditing(false)}>Cancel</button>
				<button>Update user</button>
			</div>
		</form>

	// <>
	// 		<Form
	// 			labelCol={{ span: 4 }}
	// 			wrapperCol={{ span: 14 }}
	// 			onSubmit={onSubmit}
	// 			layout="inline"
	// 			size="small"
	// 		>
	// 		</Form>
	// 		<Form.Item label="Email">
	// 			<Input type="email" name="email" value={user.email} onChange={handleInputChange}/>
	// 		</Form.Item>
	// 		<Form.Item label="First name">
	// 			<Input type="email" name="email" value={user.first_name} onChange={handleInputChange}/>
	// 		</Form.Item>
	// 		<Form.Item label="Last name">
	// 			<Input type="email" name="email" value={user.last_name} onChange={handleInputChange}/>
	// 		</Form.Item>
	//
	// 		<Form.Item label="Button">
	// 			<Button type="primary">Button</Button>
	// 		</Form.Item>
	// </>
	)
};

export default EditUser;
