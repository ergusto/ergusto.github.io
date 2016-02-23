import React from 'react';
import Velocity from 'velocity-animate';
import SettingsComponent from '../settings/index.jsx';

// import styles for this component
require('!style!css!sass!./styles/introduction.scss');

const body = document.body;

const prevent = function(event) {
	event.preventDefault();
};

export default class IntroductionComponent extends React.Component {

	constructor(props) {
		super(props);
		this.setBeforeUnload();
	}

	setBeforeUnload() {
		const user = this.props.user;
		const shouldShowAnimation = user.shouldSeeIntroAnimation();
		if (shouldShowAnimation) {
			window.onbeforeunload = function(){
				window.scrollTo(0,0);
			}
		}
	}

	fergusToErgusto() {
		const refs = this.refs;
		const container = document.querySelector('.introduction');

		Velocity(refs.namef1, { color: '#000' });

		setTimeout(() => {
			Velocity(refs.nameu1, { color: '#000' });

			setTimeout(() => {
				Velocity(refs.names1, { color: '#000' });

				setTimeout(() => {
					Velocity(refs.namer2, { color: '#000' });

					setTimeout(() => {
						Velocity(refs.namen1, { color: '#000' });

						setTimeout(() => {
							Velocity(refs.namef1, { opacity: 0 });
							Velocity(refs.nameu1, { opacity: 0 });
							Velocity(refs.names1, { opacity: 0 });
							Velocity(refs.namer2, { opacity: 0 });
							Velocity(refs.namen1, { opacity: 0 }, () => {

								setTimeout(() => {
									Velocity(refs.nameu1, { width: 0 }, { display: 'none' });
									Velocity(refs.names1, { width: 0 }, { display: 'none' });
									Velocity(refs.wordspacer, { width: 0 }, { display: 'none' });
									Velocity(refs.namer2, { width: 0 }, { display: 'none' });
									Velocity(refs.namen1, { width: 0 }, { display: 'none' });

									setTimeout(() => {
										Velocity(container, { 'min-height': '' }, { duration: 800 });

										Velocity(refs.heading, { 'margin-left': 0, 'font-size': '20px' }, { duration: 800, display: 'inline-block' });
										Velocity(refs.namef1, { width: 0 }, { display: 'none' });

										setTimeout(() => {
											body.classList.remove('hide-overflow');
											body.removeEventListener('touchmove', prevent);

											setTimeout(() => {
												refs.settings.classList.remove('hidden');
												Velocity(refs.settings, { opacity: 1 }, { duration: 800 });
												refs.panel.classList.remove('full-height');
												refs.panel.classList.remove('panel');

											}, 300);
										}, 700);
									}, 500);
								});
							});
						}, 300);
					}, 300);
				}, 300);
			}, 300);
		}, 300);
	}

	componentDidMount() {
		const user = this.props.user;
		const shouldShowAnimation = user.shouldSeeIntroAnimation();
		if (shouldShowAnimation) {
			setTimeout(() => {
				this.fergusToErgusto();
			}, 1000);
		}
	}

	render() {
		const user = this.props.user;
		const shouldShowAnimation = user.shouldSeeIntroAnimation();
		let panelClass;
		let name;
		let settingsClass;

		if (shouldShowAnimation) {
			body.classList.add('hide-overflow');
			body.addEventListener('touchmove', prevent);
			panelClass = 'introduction panel full-height';
			settingsClass = 'hidden seethrough';

			name = (<span className="name">
						<span ref="namef1">F</span><span ref="namee1">e</span><span ref="namer1">r</span><span ref="nameg1">g</span><span ref="nameu1">u</span><span ref="names1">s</span> 
						<span ref="wordspacer" className="invisible">i</span>
						<span className="name-r" ref="namer2">R</span><span ref="nameu2">u</span><span ref="names2">s</span><span ref="namet1">t</span><span ref="nameo1">o</span><span ref="namen1">n</span>
					</span>);

		} else {
			panelClass = 'introduction introduction-no-animation panel';
			settingsClass = 'settings-container';

			name = (<span className="name">ergusto</span>);
		}

		return (

			<section ref="panel" className={panelClass}>

				<div id="introduction" className="introduction-content">

					<div ref="settings" className={settingsClass}>
						<SettingsComponent user={user} />
					</div>

					<h1 ref="heading" className="introduction-heading">
						<a href="/">
							{name}
						</a>
					</h1>

				</div>

			</section>
			
		)
	}

}