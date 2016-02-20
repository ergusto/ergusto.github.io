import React from 'react';
import Velocity from 'velocity-animate';

const body = document.body;

const prevent = function(event) {
	event.preventDefault();
};

export default class IntroductionComponent extends React.Component {

	constructor(props) {
		super(props);
		body.addEventListener('touchmove', prevent);
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
									Velocity(refs.namef1, { width: 0 }, { display: 'none' });
									Velocity(refs.nameu1, { width: 0 }, { display: 'none' });
									Velocity(refs.names1, { width: 0 }, { display: 'none' });
									Velocity(refs.wordspacer, { width: 0 }, { display: 'none' });
									Velocity(refs.namer2, { width: 0 }, { display: 'none' });
									Velocity(refs.namen1, { width: 0 }, { display: 'none' });

									setTimeout(function() {
										Velocity(container, { 'min-height': '' }, { duration: 800 });

										Velocity(refs.heading, { 'margin-left': 0, 'font-size': '24px' }, { duration: 800 });
										Velocity(refs.tagline, { 'margin-left': 0, 'font-size': '12px' }, { duration: 800 });

										setTimeout(function() {
											body.classList.remove('hide-overflow');
											body.removeEventListener('touchmove', prevent);

										}, 750);

									}, 800);
								});
							});
						}, 700);
					}, 400);
				}, 400);
			}, 400);
		}, 400);
	}

	componentDidMount() {
		body.scrollTop = document.documentElement.scrollTop = 0;

		setTimeout(() => {
			this.fergusToErgusto();
		}, 1500);
	}

	render() {
		return (

	        <section className="full-height introduction">

	            <div id="introduction" className="introduction-content">

	            	<h1 ref="heading" className="introduction-heading">
	                    <span className="name">
	                        <span ref="namef1">F</span><span ref="namee1">e</span><span ref="namer1">r</span><span ref="nameg1">g</span><span ref="nameu1">u</span><span ref="names1">s</span> 
	                        <span ref="wordspacer" className="invisible">i</span>
	                        <span className="name-r" ref="namer2">R</span><span ref="nameu2">u</span><span ref="names2">s</span><span ref="namet1">t</span><span ref="nameo1">o</span><span ref="namen1">n</span>
	                    </span>
	                </h1>
	                <p ref="tagline" className="introduction-tagline">I like making things.</p>

	            </div>

	        </section>
		)
	}

}