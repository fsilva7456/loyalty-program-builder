import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FormField from '../FormField/FormField';
import { validationRules } from '../../utils/validationRules';
import { validateStep } from '../../utils/validation';

const steps = [
  {
    id: 'company',
    title: 'Company Information',
    fields: ['name', 'industry', 'size', 'target_audience']
  },
  {
    id: 'goals',
    title: 'Program Goals',
    fields: ['primary_goal', 'secondary_goals', 'budget_range', 'timeline']
  },
  {
    id: 'rewards',
    title: 'Rewards Structure',
    fields: ['points_value', 'tier_levels', 'reward_types']
  },
  {
    id: 'review',
    title: 'Program Review',
    fields: ['summary', 'estimated_costs', 'projected_benefits']
  }
];

const ProgramWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    const currentStepId = steps[currentStep].id;
    const { isValid, errors: stepErrors } = validateStep(currentStepId, formData, validationRules);

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        setErrors({});
      }
    } else {
      setErrors(stepErrors);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Validate all steps
      let isValid = true;
      const allErrors = {};

      steps.forEach(step => {
        const { isValid: stepValid, errors: stepErrors } = validateStep(step.id, formData, validationRules);
        if (!stepValid) {
          isValid = false;
          Object.assign(allErrors, stepErrors);
        }
      });

      if (!isValid) {
        setErrors(allErrors);
        throw new Error('Please fix all errors before submitting');
      }

      // Here you would typically send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message or redirect
      console.log('Form submitted successfully', formData);

    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {submitError && (
            <Alert variant="destructive">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {steps[currentStep].fields.map(field => {
            const stepId = steps[currentStep].id;
            const fieldRules = validationRules[stepId]?.[field];
            
            return (
              <FormField
                key={field}
                field={field}
                label={field.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
                value={formData[field] || ''}
                onChange={handleInputChange}
                error={errors[field]}
                required={fieldRules?.required}
                options={fieldRules?.options}
                type={fieldRules?.type || 'text'}
              />
            );
          })}
        </div>
        
        <div className="flex justify-between mt-6">
          <Button 
            onClick={handlePrevious}
            disabled={currentStep === 0 || isSubmitting}
            variant="outline"
          >
            Previous
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Program'}
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              disabled={isSubmitting}
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramWizard;