import React from 'react';

import DropdownStateBehaviour from '../../behaviours/dropdown.js';

// import styles for this component
require('!style!css!sass!./styles/settings.scss');

export default class SettingsComponent extends  React.Component {
	
	constructor(props) {
		super(props);

		this.state = {};
		this.dropdown = new DropdownStateBehaviour(this);
		
		this.props.user.onUpdate(() => {
			this.forceUpdate();
		});
	}

	componentDidMount() {
		this.dropdown.domReady();
	}

	showIntroHandler(event) {
		event.preventDefault();
		this.props.user.setShouldShowIntro(true);
	}

	hideIntroHandler(event) {
		event.preventDefault();
		this.props.user.setShouldShowIntro(false);
	}

	usernameChangeHandler(event) {
		const username = event.target.value;
		this.props.user.setUsername(username);
	}

	resetHandler(event) {
		event.preventDefault();
		this.props.user.resetAllLocalStorage();
	}

	render() {
		let dropdownClass;
		let triggerClass;
		let animationSettingLabelText;
		const { user } = this.props;
		const username = user.getUsername();

		if (this.dropdown.isOpen()) {
			dropdownClass = 'dropdown box clearfix';
			triggerClass = 'settings-trigger opaque';
		} else {
			dropdownClass = 'hidden dropdown clearfix';
			triggerClass = 'settings-trigger';
		}

		if (user.shouldSeeIntroAnimation) {
			animationSettingLabelText = 'show intro animation';
		} else {
			animationSettingLabelText = 'do not show intro animation';
		}

		return (
			<div className="settings pull-right">
				<a onClick={this.dropdown.openHandler.bind(this.dropdown)} href="#" ref="dropdowntrigger" className={triggerClass}>&#x221e;</a>

				<div ref="dropdown" className={dropdownClass}>
					<h5 className="settings-title">settings</h5>
					<div className="settings-field">
						<label className="settings-label"><small>username: {username}</small></label>
						<input onChange={this.usernameChangeHandler.bind(this)} type="text" className="field" defaultValue={username} />
					</div>
					<div className="settings-field">
						<label className="settings-label"><small>{animationSettingLabelText}</small></label>
						<a href="#" onClick={this.showIntroHandler.bind(this)} className="btn margin-right-sm">show animation</a>
						<a href="#" onClick={this.hideIntroHandler.bind(this)} className="btn">hide animation</a>
					</div>
					<div className="inline-field-row">
						<div className="settings-field inline-field">
							<label className="settings-label"><small>reset all data</small></label>
							<a href="#" onClick={this.resetHandler.bind(this)} className="btn">reset</a>
						</div>
						<div className="settings-field inline-field">
							<label className="settings-label"><small>view on github</small></label>
							<a href="http://github.com/ergusto/ergusto.github.io" className="btn">view</a>
						</div>
					</div>
				</div>
			</div>
		);
	}

}