import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import { useUpdateUser } from './UserService';
import Modal from 'antd/es/modal';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import { useForm } from 'antd/es/form/Form';

const EditUser = ({ children, user, users, setUsers }) => {
	const { updateUser } = useUpdateUser(users, setUsers);

	const [open, setOpen] = useState(false);
	const [form] = useForm();

	const onSubmit = useCallback( () => {
		try {
			updateUser(user.id);
			setOpen(false);
		} catch (error) {
			console.log(error)
		}
	}, [form, updateUser, user, setOpen]);

	const onClick = useCallback(() => {
		if (user !== null) {
			form.setFieldsValue(user);
		}
		setOpen(true);
	}, [form, user, setOpen]);

	return (
		<>
			{React.cloneElement(children, {
				onClick: onClick,
			})}
			<Modal
				visible={open}
				onCancel={() => setOpen(false) }
				onOk={onSubmit}
			>
				<Form form={form}>
					<Form.Item
						label="First name"
						name="first_name"
						rules={[
							{
								required: true,
								message: 'First name is required',
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
								message: 'Last name is required',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: 'Email is required',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

EditUser.propTypes = {
	children: PropTypes.element,
	user: PropTypes.object,
	users: PropTypes.array,
	setUsers: PropTypes.func,
};

export default EditUser;
