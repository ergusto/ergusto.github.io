import { createReducer, generateId } from 'lib';

const initialState = {
	items: [],
};

initialState.items.push({
	text: "Hi. I'm a Javascript engineer with a strong interest in user interface and user experience design. My name's Fergus Ruston.",
	username: 'ergusto',
	date: new Date(),
	parentId: false,
	id: generateId()
});

initialState.items.push({
	text: "This website is a playground I use to experiment with design and development, and to hone my skills.",
	username: "ergusto",
	date: new Date(),
	parentId: false,
	id: generateId()
})

export default createReducer(initialState, {
	
});