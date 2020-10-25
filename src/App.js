import React, { useState } from 'react';
import { DatePicker, message } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

const App = () => {
	const [date, setDate] = useState(null);
	const handleChange = value => {
		message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
		setDate(value);
	};
	return (
		<div className="container">
			<DatePicker onChange={handleChange} />
			<div style={{ marginTop: 16 }}>
				Selected Date: { date ? date.format('YYYY-MM-DD') : 'None' }
			</div>
		</div>
	);
};

export default App;