import React from 'react';

const FormField = ({
  field,
  label,
  value,
  onChange,
  error,
  required,
  options,
  type = 'text'
}) => {
  const fieldId = `field-${field}`;
  
  return (
    <div className="space-y-2">
      <label 
        htmlFor={fieldId}
        className="text-sm font-medium"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {options ? (
        <select
          id={fieldId}
          className={`w-full p-2 border rounded ${error ? 'border-red-500' : ''}`}
          value={value || ''}
          onChange={onChange}
        >
          <option value="">Select...</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          type={type}
          className={`w-full p-2 border rounded ${error ? 'border-red-500' : ''}`}
          value={value || ''}
          onChange={onChange}
        />
      )}

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};

export default FormField;