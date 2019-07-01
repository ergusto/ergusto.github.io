import React from 'react';
import ReactDOM from 'react-dom';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import App from './app/startup/index.jsx';

if (!('ontouchstart' in document.documentElement)) {
	document.documentElement.classList.add('no-touch');
}

JavascriptTimeAgo.locale(en);

ReactDOM.render(<App />, document.getElementById('root'));