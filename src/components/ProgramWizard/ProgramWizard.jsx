import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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
          {steps[currentStep].fields.map(field => (
            <div key={field} className="space-y-2">
              <label className="text-sm font-medium">
                {field.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData[field] || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  [field]: e.target.value
                })}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-6">
          <Button 
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramWizard;