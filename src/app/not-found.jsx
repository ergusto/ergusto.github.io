import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {

	render() {
		return (
			<div className="page full-height justify-centre">
				<div className="align-center comfortaa">
					<h1>Not found</h1>
					<h2 className="margin-vertical">404</h2>
					<Link to="/" className="color-black no-decoration button button--outline inline-block">Go back to safety</Link>
				</div>
			</div>
		);
	}

}