export const validateField = (field, value, rules) => {
  if (!rules) return null;

  if (rules.required && (!value || value.trim() === '')) {
    return 'This field is required';
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Minimum length is ${rules.minLength} characters`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `Maximum length is ${rules.maxLength} characters`;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Invalid format';
  }

  if (rules.options && !rules.options.includes(value)) {
    return 'Please select a valid option';
  }

  if (rules.validate && !rules.validate(value)) {
    return 'Invalid value';
  }

  if (rules.minCount && (!Array.isArray(value) || value.length < rules.minCount)) {
    return `Please select at least ${rules.minCount} option(s)`;
  }

  if (rules.maxCount && Array.isArray(value) && value.length > rules.maxCount) {
    return `Maximum ${rules.maxCount} options allowed`;
  }

  return null;
};

export const validateStep = (stepId, formData, validationRules) => {
  const stepRules = validationRules[stepId];
  if (!stepRules) return { isValid: true, errors: {} };

  const stepErrors = {};
  let isValid = true;

  Object.keys(stepRules).forEach(field => {
    const error = validateField(field, formData[field], stepRules[field]);
    if (error) {
      stepErrors[field] = error;
      isValid = false;
    }
  });

  return { isValid, errors: stepErrors };
};