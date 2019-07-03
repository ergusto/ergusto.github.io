import React from 'react';
import ReactDOM from 'react-dom';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons';

import App from './app/startup/index.jsx';

library.add(faBars);

if (!('ontouchstart' in document.documentElement)) {
	document.documentElement.classList.add('no-touch');
}

JavascriptTimeAgo.locale(en);

ReactDOM.render(<App />, document.getElementById('root'));