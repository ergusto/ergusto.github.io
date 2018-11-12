import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/contact.scss');

export default class ContactInfoComponent extends  React.Component {

    render() {
        return (
			 <section className="contact contact-panel full-height padding justify-centre">
			 	<div className="contact-info box">
			 		<img className="contact-landscape" src="../../../static/landscape.jpg" />
			 		<img className="contact-img" src="../../../static/ferg.jpg" />
		 			<div className="padding box-shadow-inset">
		 				<h2>Fergus Ruston</h2>
		 				<p>I'm a front end developer currently living in London. I love building user interfaces. You can find me around the web as <strong>ergusto</strong>.</p>
		 				<p>Want to hire me? Get in contact -> <a href="mailto:ergusto@gmail.com"><strong>ergusto@gmail.com</strong></a></p>
		 			</div>
			 	</div>
			 </section>
        )
    }

}