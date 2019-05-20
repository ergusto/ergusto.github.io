export const validator = {
	text: value => {
		if(!value || !value.length) {
			return 'Please provide a value';
		}
	}
};