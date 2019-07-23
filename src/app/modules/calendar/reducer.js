import { createReducer, getHourDigit } from 'app/lib';

import {
	ENTRY_CREATE,
	ENTRY_EDIT,
	ENTRY_DELETE,
	ENTRY_RESET
} from './actionTypes.js';

export default createReducer({
	[ENTRY_CREATE]: (state, payload) => {
		const { entry } = payload;
		const { startTime, endTime } = entry;

		entry.length = (getHourDigit(endTime) - getHourDigit(startTime)) + 1;

		return Object.assign({}, state, {
			entries: [].concat([entry], state.entries)
		});
	},
	[ENTRY_EDIT]: (state, payload) => {

	},
	[ENTRY_DELETE]: (state, payload) => { 

	},
	[ENTRY_RESET]: (state, payload) => {

	}
});