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
    		const validator = validators[name],
    			value = values[name];

    		let error = validateField(name, value);

    		if(error) {
    			result[name] = error;
    		}
    	}

    	if(Object.keys(result).length) {
    		setErrors(prev => ({
    			...prev,
    			...result
    		}));
    	}

    	return result;
    };
    
    const handleSubmit = (event) => {
        if(event) event.preventDefault();

    	const validationResult = validateAll();

        if(Object.keys(validationResult).length) {
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