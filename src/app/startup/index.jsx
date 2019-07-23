import React from 'react';
import viewportBuggyfill from 'viewport-units-buggyfill';

import Routes from './routes.jsx';

viewportBuggyfill.init();

const app = () => (
	<Routes />
);

export default app;