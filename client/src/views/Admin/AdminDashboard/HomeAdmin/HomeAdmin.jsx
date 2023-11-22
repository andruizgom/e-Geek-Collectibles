import React from 'react';
import Dashboard from '../Dashboard/Dashboard';



export default function HomeAdmin({ activeContent }) {
	const renderContent = () => {
		switch (activeContent) {
			case 'dashboard':
				return <Dashboard />;

			default:
				return null;
		}
	};

	return (
		<div>
			{renderContent()}
		</div>
	);
}