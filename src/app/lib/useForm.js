import { useState } from 'react';

export const useForm = (initialValues, validators, callback) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [hasError, setHasError] = useState(false);

    const validateField = (name, value) => {
        let error;
        const validator = validators[name];

    	if(validator) {
            error = validator(value);
        }

        if(error) {
            setErrors(errors => ({ ...errors, [name]: error }));
            setHasError(true);
        } else {
        	if(errors[name]) {
	        	setErrors(errors => {
	        		const state = { ...errors };
	        		delete state[name];
	        		return state;
	        	});
	        }
        }
    };

    const validateAll = callback => {
    	const result = {};

    	for (let name in validators) {
    		const value = values[name];

    		let error = validateField(name, value);

    		if(error) {
    			result[name] = error;
    		}
    	}

    	return result;
    };
    
    const handleSubmit = (event) => {
        if(event) event.preventDefault();

    	const validationResult = validateAll();

        if(Object.keys(validationResult).length) {
    		setErrors(prev => ({
    			...prev,
    			...validationResult
    		}));
            return;
        }

        callback(values);
    };

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setValues(values => ({ ...values, [name]: value }));
        validateField(name, value);
    };

    return [values, errors, hasError, handleFieldChange, handleSubmit];
}