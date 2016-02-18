class Introduction extends React.Component {

	componentDidMount() {
		const component = this;
		
		setTimeout(function() {

			component.refs.namef1.classList.add('hidden');
				component.refs.nameu1.classList.add('invisible');
					component.refs.names1.classList.add('invisible');

					setTimeout(function() {
						component.refs.namer2.classList.add('invisible');
							component.refs.namen1.classList.add('hidden');

							setTimeout(function() {
								component.refs.nameu1.classList.add('hidden');
								component.refs.names1.classList.add('hidden');
								component.refs.namer2.classList.add('hidden');

							}, 500);

			}, 500);

		}, 1000);

	}

	render() {
		return (
			<div>
				<h1><span>Hi! My name is </span>
                    <span className="name">
                    	<span className="firstName">
                        	<span ref="namef1">F</span><span ref="namee1">e</span><span ref="namer1">r</span><span ref="nameg1">g</span><span ref="nameu1">u</span><span ref="names1">s</span> 
                        </span>

                        <span className="secondName">
                        	<span ref="namer2"> R</span><span ref="nameu2">u</span><span ref="names2">s</span><span ref="namet1">t</span><span ref="nameo1">o</span><span ref="namen1">n</span> 
                        </span>
                    </span>.
                </h1>
                <p>I like making things.</p>
            </div>
		)
	}

}

ReactDOM.render(<Introduction />, document.getElementById('introduction'));