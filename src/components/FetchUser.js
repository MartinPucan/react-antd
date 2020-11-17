import React, { useEffect, useState } from 'react';

export default function FetchUser() {
	const [items, setItems] = useState([]);

	const fetchData = async () => {
		try {
			const response = await fetch("https://api.github.com/users");
			const json = await response.json();
			setItems(json.data)
		} catch (error) {
			console.log(error);
		}
	}
	console.log(items);

	useEffect(() => {
		fetchData();
	}, [])

	return (
		<div>
			<ul>
				{/*{items.map(item => (*/}
				{/*	<li key={item.id}>{item.name}</li>*/}
				{/*))}*/}
			</ul>
		</div>
	);
}
