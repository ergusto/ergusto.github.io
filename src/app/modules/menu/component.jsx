import React, { createRef } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export default class Menu extends React.Component {

	constructor(props) {
		super(props);
		
		this.dropdown = createRef();
		this.button = createRef();
	}

	componentWillUnmount() {
		this.removeBodyListener();
	}

	state = {
		showMenu: false,
		menuHover: false
	};

	toggle = event => {
		event.preventDefault();
		const { showMenu } = this.state;

		if (showMenu) {
			this.close();
		} else {
			this.open();
		}
	};

	addBodyListener = () => {
		document.body.addEventListener("click", this.onBodyClick);
	};

	removeBodyListener = () => {
		document.body.removeEventListener("click", this.onBodyClick);
	};

	onBodyClick = event => {
		if (!this.dropdown.current.contains(event.target) && !this.button.current.contains(event.target)) {
			this.close();
		}
	}

	open = () => {
		this.setState({
			showMenu: true
		}, () => this.addBodyListener());
	};

	close = () => {
		this.setState({
			showMenu: false,
			menuHover: false
		}, () => this.removeBodyListener());
	};

	onMouseOver = () => {
		this.setState({
			menuHover: true
		});
	};

	onMouseOut = () => {
		this.setState({
			menuHover: false
		})
	};

	render() {
		const { showMenu, menuHover } = this.state;

		let menuClass = "menu box-shadow-large background-color-dark-blue";

		if (showMenu) {
			menuClass += " menu--open";
		}

		if(menuHover) {
			menuClass += " menu--hovered";
		}

		return (
			<div className={menuClass} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
				<div ref={this.button} onClick={this.toggle} id="dropDown" className="menu-button cursor-pointer border-bottom-radius background-color-dark-blue">
					<span className="font-size-small font-family-raleway color-white">Menu</span>
				</div>

				<div ref={this.dropdown} className="menu-box padding-all font-family-raleway color-white">
					<h1 className="font-family-comfortaa inline-block font-size-bigger line-height-site-title margin-right-2 margin-left">ergusto</h1>
					<ul className="inline-block float-right">
						<li className="inline-block margin-right"><Link className="color-white no-decoration line-height-site-title" to="/">Intro</Link></li>
						<li className="inline-block margin-right"><Link className="color-white no-decoration line-height-site-title" to="/calendar">Calendar</Link></li>
						<li className="inline-block margin-right"><Link className="color-white no-decoration line-height-site-title" to="/comments">Comments</Link></li>
					</ul>
				</div>
			</div>
		);
	}

}