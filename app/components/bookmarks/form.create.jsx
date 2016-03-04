import React from 'react';
const PropTypes = React.PropTypes;

import BookmarkFormComponent from './form.jsx';

export default class BookmarkCreateFormComponent extends BookmarkFormComponent {

}

BookmarkCreateFormComponent.propTypes = {
	bookmarks: PropTypes.object.isRequired,
	submitCallback: PropTypes.func.isRequired
};