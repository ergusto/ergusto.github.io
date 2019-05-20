import { useReducer, useEffect } from 'react';
import { isString, isObject } from './lib.js';

const useLocalStorageReducer = (storeName, reducer, initialState) => {
	let existingState = localStorage.getItem(storeName);

	if(isString(existingState)) {
		existingState = JSON.parse(existingState);
	}

	const [state, dispatch] = useReducer(reducer, existingState ? existingState : initialState);

	useEffect(() => {
		if(isObject(state)) {
			const store = JSON.stringify(state);
			localStorage.setItem(storeName, store);
		}
	}, [state]);

	return [state, dispatch];
};

export default useLocalStorageReducer;