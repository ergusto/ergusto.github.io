import React from 'react';
import ReactDOM from 'react-dom';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltLeft, faArrowAltRight }from '@fortawesome/pro-solid-svg-icons';

import App from './app/startup/index.jsx';
library.add(faBars, faArrowAltLeft, faArrowAltRight, faTimes);

if (!('ontouchstart' in document.documentElement)) {
	document.documentElement.classList.add('no-touch');
}

JavascriptTimeAgo.locale(en);

ReactDOM.render(<App />, document.getElementById('root'));