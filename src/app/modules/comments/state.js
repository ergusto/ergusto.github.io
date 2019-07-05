import { generateId } from 'lib';

export const makeComment = comment => {
	return {
		text: "",
		parentId: null,
		username: 'ergusto',
		date: new Date(),
		id: generateId(),
		...comment
	};
};

const getInitialState = () => {
	const initialState = {
		comments: [],
	};

	const parentId = generateId(),
		childId = generateId(),
		grandChildId = generateId();

	initialState.comments.push(makeComment({
		text: "Hi. I'm a programmer with an interest in user interface and user experience design. My name's Fergus Ruston.",
		parentId: null
	}));

	initialState.comments.push(makeComment({
		id: parentId,
		text: "This website is a playground I use to experiment with UX and development. It contains a number of projects I designed and built with React and Redux.",
		parentId: null
	}));

	initialState.comments.push(makeComment({
		id: childId,
		text: "I'm also interested in Python, Django, NodeJS, Bash, API design, and various other languages, disciplines and technologies. You can see some of my other projects [here](http://www.github.com/ergusto).",
		parentId
	}));

	initialState.comments.push(makeComment({
		id: grandChildId,
		text: "Most examples on this website are interactive, and use the Local Storage API to persist data between sessions. Try replying to or editing one of these comments.",
		parentId: childId
	}));

	initialState.comments.push(makeComment({
		text: "You can find some other things to play with by clicking the button in the top right.",
		parentId: grandChildId
	}));

	return initialState;
};

export default getInitialState;