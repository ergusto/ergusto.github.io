import { generateId } from 'app/lib';

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
		childId = generateId();

	initialState.comments.push(makeComment({
		text: "Hi there. I'm a programmer with an interest in user interface and user experience design. My name's Fergus Ruston.",
		parentId: null
	}));

	initialState.comments.push(makeComment({
		id: parentId,
		text: "This website is a playground I use to experiment with UX and development. It contains a number of projects I designed and built with React.",
		parentId: null
	}));

	initialState.comments.push(makeComment({
		id: childId,
		text: "I'm also interested in Python, Django, NodeJS, Bash, API design, and various other languages, disciplines and technologies.",
		parentId
	}));

	initialState.comments.push(makeComment({
		text: 'Most examples on this website are interactive, and use the Local Storage API to persist data between sessions. Try replying to or editing one of these comments. You can find some other things to play with by clicking the button in the top right.',
		parentId: childId
	}));

	return initialState;
};

export default getInitialState;