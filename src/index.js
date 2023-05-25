import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('ROOT_TEAM_TWO');
const root = createRoot(rootElement);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
