class Introduction extends React.Component {

	componentDidMount() {
		const refs = this.refs;
		
		setTimeout(function() {
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
										Velocity(refs.namef1, { opacity: 0 }, { display: 'none' });
										Velocity(refs.nameu1, { opacity: 0 }, { display: 'none' });
										Velocity(refs.names1, { opacity: 0 }, { display: 'none' });
										Velocity(refs.namer2, { opacity: 0 }, { display: 'none' });
										Velocity(refs.namen1, { opacity: 0 }, { display: 'none' });
									}, 300);
								});

							}, 700);

						}, 400);

					}, 400);

				}, 400);

			}, 400);

		}, 700);

	}

	render() {
		return (
			<div>
				<h1><span>Hi! My name is </span>
                    <span ref="name1" className="name">
                        <span ref="namef1">F</span><span ref="namee1">e</span><span ref="namer1">r</span><span ref="nameg1">g</span><span ref="nameu1">u</span><span ref="names1">s</span> 

                        <span ref="namer2"> R</span><span ref="nameu2">u</span><span ref="names2">s</span><span ref="namet1">t</span><span ref="nameo1">o</span><span ref="namen1">n</span>
                    </span><span ref="name2" className="name name-tofadein">ergusto</span>.
                </h1>
                <p>I like making things.</p>
            </div>
		)
	}

}

ReactDOM.render(<Introduction />, document.getElementById('introduction'));