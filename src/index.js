import React from 'react';
import ReactDOM from 'react-dom';
import JavascriptTimeAgo from 'javascript-time-ago';
import viewportBuggyfill from 'viewport-units-buggyfill';
import en from 'javascript-time-ago/locale/en';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAddressBook, faUser, faBars, faPlus, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltLeft, faArrowAltRight, faTimesSquare }from '@fortawesome/pro-solid-svg-icons';
import elementClosest from 'element-closest';

import 'typeface-comfortaa';
import 'typeface-raleway';
import './css/site.scss';

import App from './app/startup/index.jsx';

viewportBuggyfill.init();
elementClosest(window);
JavascriptTimeAgo.locale(en);
library.add(faBars, faUser, faAddressBook, faArrowAltLeft, faArrowAltRight, faPlus, faTimes, faTimesSquare, faTrashAlt);

if (!('ontouchstart' in document.documentElement)) {
	document.documentElement.classList.add('no-touch');
}

ReactDOM.render(<App />, document.getElementById('root'));