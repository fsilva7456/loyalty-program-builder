/**
 * Manages form error states and provides utility functions
 */

export const clearFieldError = (errors, fieldName) => {
  const newErrors = { ...errors };
  delete newErrors[fieldName];
  return newErrors;
};

export const clearAllErrors = () => ({});

export const addFieldError = (errors, fieldName, errorMessage) => ({
  ...errors,
  [fieldName]: errorMessage
});

export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

export const getFieldError = (errors, fieldName) => {
  return errors[fieldName] || null;
};

export const validateAllFields = (formData, validationFn) => {
  const errors = {};
  let isValid = true;

  Object.keys(formData).forEach(field => {
    const error = validationFn(field, formData[field]);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};

export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      message: error.response.data.message || 'Server error occurred',
      status: error.response.status,
      details: error.response.data
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: 'No response received from server',
      status: 0,
      details: { error: 'Network error' }
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
      details: { error: 'Application error' }
    };
  }
};