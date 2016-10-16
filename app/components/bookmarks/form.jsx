import React from 'react';
import FormStateBehaviour from '../../behaviours/form.js';

import { isURL } from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./styles/form.scss');

export default class BookmarkFormComponent extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {};
        this.form = new FormStateBehaviour(this);
        this.form.makeFields(['title', 'url', 'description']);
    }

    submitHandler(event) {
        event.preventDefault();
        const form = this.form;
        let saved, hasError = false;
        let { user, bookmark, bookmarks, submitCallback } = this.props;
        const { bookmarkTitleInput, bookmarkUrlInput, bookmarkNotesInput } = this.refs;
        
        if (!bookmark) bookmark = bookmarks.shell();

        const title = bookmarkTitleInput.value;
        const url = bookmarkUrlInput.value;
        const notes = bookmarkNotesInput.value;
        
        if (!title.trim().length) {
            form.title.addError('Please enter a title');
            hasError = true;
        }
        
        if (!url.trim().length) {
            form.url.addError('Please enter a URL');
            hasError = true;
        } else 

        if (!isURL(url.trim())) {
            form.url.addError('Please enter a valid URL');
            hasError = true;
        }

        if (hasError) return;

        bookmark.title = title;
        bookmark.url = url;
        bookmark.notes = notes;

        if (bookmark.id) {
            saved = bookmarks.update(bookmark);
        } else {
            bookmark.username = user.getUsername();
            saved = bookmarks.create(bookmark);
        }

        if (submitCallback) {
            submitCallback(saved);
        }
    }

    renderError(key) {
        const error = this.form[key] ? this.form[key].error : null;
        if (error) return <span className="form-error padding-left-sm"><small>{error}</small></span>
    }

    render() {
        const err = this.form.error;
        let { bookmark, formTitle, cancelCallback } = this.props;
        if (!formTitle) formTitle = 'new bookmark';
        
        let titleValue;
        let urlValue;
        let notesValue;
        let errContent;
        let cancelContent;

        if (bookmark) {
            titleValue = bookmark.title;
            urlValue = bookmark.url;
            notesValue = bookmark.notes
        }

        if (err) {
            errContent = <span className="form-error">{err}</span>;
        }

        if (cancelCallback) {
            cancelContent = <a href="#" className="btn btn-tall" onClick={cancelCallback}>Cancel</a>;
        }

        return (
        	<div className="bookmark-form-container box margin-top">
                <header className="box-header bookmark-form-header padding-horizontal box-shadow">
				    <h3 className="bookmark-form-title muted">{formTitle}</h3> 
                </header>
				<form onSubmit={this.submitHandler.bind(this)} className="bookmark-form">
                    <div className="padding">
    					<input defaultValue={titleValue} ref="bookmarkTitleInput" name="title" placeholder="title" className="field" />
                        {this.renderError('title')}
    					<input defaultValue={urlValue} ref="bookmarkUrlInput" name="url" placeholder="url" type="url" className="field" />
                        {this.renderError('url')}
    					<textarea defaultValue={notesValue} ref="bookmarkNotesInput" name="notes" placeholder="notes" className="field"></textarea>
                    </div>
                    <div className="form-footer box-shadow-inset padding-horizontal padding-vertical-sm border-top">
                        <input type="submit" value="submit" className="btn"></input>
                        {cancelContent}
                    </div>
				</form>
        	</div>
        );
    }

}