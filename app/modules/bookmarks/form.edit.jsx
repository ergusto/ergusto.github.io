import React from 'react';
const PropTypes = React.PropTypes;

import BookmarkFormComponent from './form.jsx';

export default class BookmarkEditFormComponent extends BookmarkFormComponent {

}

BookmarkEditFormComponent.propTypes = {
	formTitle: PropTypes.string.isRequired,
	bookmark: PropTypes.object.isRequired,
	bookmarks: PropTypes.object.isRequired,
	submitCallback: PropTypes.func.isRequired
};