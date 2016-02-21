import React from 'react';
import Velocity from 'velocity-animate';
import SettingsComponent from '../settings/index.jsx';

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
		window.onbeforeunload = function(){
			window.scrollTo(0,0);
		}
	}

	fergusToErgusto() {
		const refs = this.refs;
		const container = document.querySelector('.introduction');

		Velocity(refs.namef1, { color: '#000' });

		setTimeout(function() {
			Velocity(refs.nameu1, { color: '#000' });

			setTimeout(function() {
				Velocity(refs.names1, { color: '#000' });

				setTimeout(function() {
					Velocity(refs.namer2, { color: '#000' });

					setTimeout(function() {
						Velocity(refs.namen1, { color: '#000' });

						setTimeout(function() {
							Velocity(refs.namef1, { opacity: 0 });
							Velocity(refs.nameu1, { opacity: 0 });
							Velocity(refs.names1, { opacity: 0 });
							Velocity(refs.namer2, { opacity: 0 });
							Velocity(refs.namen1, { opacity: 0 }, function() {

								setTimeout(function() {
									Velocity(refs.nameu1, { width: 0 }, { display: 'none' });
									Velocity(refs.names1, { width: 0 }, { display: 'none' });
									Velocity(refs.wordspacer, { width: 0 }, { display: 'none' });
									Velocity(refs.namer2, { width: 0 }, { display: 'none' });
									Velocity(refs.namen1, { width: 0 }, { display: 'none' });

									setTimeout(function() {
										Velocity(container, { 'min-height': '' }, { duration: 800 });

										Velocity(refs.heading, { 'margin-left': 0, 'font-size': '20px' }, { duration: 800 });
										Velocity(refs.namef1, { width: 0 }, { display: 'none' });

										setTimeout(function() {
											body.classList.remove('hide-overflow');
											body.removeEventListener('touchmove', prevent);

										}, 200);
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
		const shouldShowAnimation = this.props.user.shouldShowIntroAnimation();
		if (shouldShowAnimation) {
			setTimeout(() => {
				this.fergusToErgusto();
			}, 1000);
		}
	}

	render() {
		const shouldShowAnimation = this.props.user.shouldShowIntroAnimation();
		let panelClass;
		let name;

		if (shouldShowAnimation) {
			body.classList.add('hide-overflow');
			body.addEventListener('touchmove', prevent);
			panelClass = 'full-height introduction';

			name = (<span className="name">
                        <span ref="namef1">F</span><span ref="namee1">e</span><span ref="namer1">r</span><span ref="nameg1">g</span><span ref="nameu1">u</span><span ref="names1">s</span> 
                        <span ref="wordspacer" className="invisible">i</span>
                        <span className="name-r" ref="namer2">R</span><span ref="nameu2">u</span><span ref="names2">s</span><span ref="namet1">t</span><span ref="nameo1">o</span><span ref="namen1">n</span>
                    </span>)

		} else {
			panelClass = 'introduction introduction-no-animation';

			name = (<span className="name">ergusto</span>);
		}

		return (

	        <section ref="introductionPanel" className={panelClass}>

	            <div id="introduction" className="introduction-content">

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