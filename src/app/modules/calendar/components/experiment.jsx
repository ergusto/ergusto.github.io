import React, { useState } from 'react';
import posed from 'react-pose';


export default function component() {
	const [isVisible, setIsVisible] = useState(true);

	const Box = posed.div({
		hidden: { opacity: 0.5, scaleY: 1.5, scaleX: 2, transition: { duration: 500 } }
	});

	return (
		<Box onClick={() => setIsVisible(!isVisible)} pose={isVisible ? 'visible' : 'hidden'} className='padding-all inline-block background-color-blue' />
	);
}
