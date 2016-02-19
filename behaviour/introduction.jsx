const prevent = function(event) {
	event.preventDefault();
};

document.body.addEventListener('touchmove', prevent);

class Introduction extends React.Component {

	fergusToErgusto() {
		const component = this;
		const refs = component.refs;
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

										setTimeout(function() {
											document.body.classList.remove('hide-overflow');
											document.body.removeEventListener('touchmove', prevent);
										}, 750);
									}, 800);

								}, 0);
							});

						}, 700);

					}, 400);

				}, 400);

			}, 400);

		}, 400);
	}

	componentDidMount() {
		const component = this;

		setTimeout(function() {
			component.fergusToErgusto();
		}, 800);
	}

	render() {
		const component = this;
		return (
			<div>
				<h1 ref="heading">
                    <span className="name">
                        <span ref="namef1">F</span><span ref="namee1">e</span><span ref="namer1">r</span><span ref="nameg1">g</span><span ref="nameu1">u</span><span ref="names1">s</span> 
                        <span ref="wordspacer" className="invisible">i</span>
                        <span className="name-r" ref="namer2">R</span><span ref="nameu2">u</span><span ref="names2">s</span><span ref="namet1">t</span><span ref="nameo1">o</span><span ref="namen1">n</span>
                    </span>
                </h1>
                <p>I like making things.</p>
            </div>
		)
	}

}

ReactDOM.render(<Introduction />, document.getElementById('introduction'));