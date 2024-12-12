import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import FormField from '../FormField/FormField';

const MIN_SPEND = 0;
const MAX_SPEND = 1000000;
const DEFAULT_POINT_VALUE = 0.01; // $0.01 per point

const MULTIPLIER_OPTIONS = [
  { label: '1x - Standard', value: '1' },
  { label: '2x - Silver', value: '2' },
  { label: '3x - Gold', value: '3' },
  { label: '4x - Platinum', value: '4' },
  { label: 'Custom Multiplier', value: 'custom' }
];

const RewardCalculator = () => {
  const [formData, setFormData] = useState({
    spendAmount: '',
    pointsMultiplier: '1',
    customMultiplier: ''
  });
  const [errors, setErrors] = useState({});
  const [rewardValue, setRewardValue] = useState(null);
  const [calculationError, setCalculationError] = useState(null);

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'spendAmount': {
        const numValue = parseFloat(value);
        if (!value) return 'Amount is required';
        if (isNaN(numValue)) return 'Please enter a valid number';
        if (numValue < MIN_SPEND) return `Minimum amount is $${MIN_SPEND}`;
        if (numValue > MAX_SPEND) return `Maximum amount is $${MAX_SPEND}`;
        return null;
      }
      case 'pointsMultiplier': {
        if (value === 'custom' && !formData.customMultiplier) {
          return 'Please enter a custom multiplier';
        }
        return null;
      }
      case 'customMultiplier': {
        if (formData.pointsMultiplier === 'custom') {
          const numValue = parseFloat(value);
          if (!value) return 'Custom multiplier is required';
          if (isNaN(numValue)) return 'Please enter a valid number';
          if (numValue <= 0) return 'Multiplier must be greater than 0';
          if (numValue > 10) return 'Maximum multiplier is 10x';
        }
        return null;
      }
      default:
        return null;
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));

    // Clear calculation results when inputs change
    setRewardValue(null);
    setCalculationError(null);
  };

  const getEffectiveMultiplier = () => {
    if (formData.pointsMultiplier === 'custom') {
      return parseFloat(formData.customMultiplier) || 0;
    }
    return parseFloat(formData.pointsMultiplier) || 1;
  };

  const calculateRewards = (e) => {
    e.preventDefault();
    
    // Clear previous results and errors
    setRewardValue(null);
    setCalculationError(null);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const spend = parseFloat(formData.spendAmount);
      const multiplier = getEffectiveMultiplier();
      
      if (isNaN(spend) || isNaN(multiplier)) {
        throw new Error('Invalid calculation inputs');
      }

      const points = spend * multiplier;
      const value = points * DEFAULT_POINT_VALUE;

      if (value > MAX_SPEND) {
        throw new Error('Calculated reward exceeds maximum allowed value');
      }

      setRewardValue({
        points: Math.round(points),
        value: value.toFixed(2)
      });

    } catch (error) {
      setCalculationError(error.message);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Reward Value Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={calculateRewards} className="space-y-4">
          <FormField
            field="spendAmount"
            label="Purchase Amount ($)"
            type="number"
            value={formData.spendAmount}
            onChange={handleInputChange}
            error={errors.spendAmount}
            required
          />

          <FormField
            field="pointsMultiplier"
            label="Points Multiplier"
            value={formData.pointsMultiplier}
            onChange={handleInputChange}
            error={errors.pointsMultiplier}
            options={MULTIPLIER_OPTIONS.map(opt => opt.label)}
            required
          />

          {formData.pointsMultiplier === 'custom' && (
            <FormField
              field="customMultiplier"
              label="Custom Multiplier Value"
              type="number"
              value={formData.customMultiplier}
              onChange={handleInputChange}
              error={errors.customMultiplier}
              required
            />
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={Object.keys(errors).length > 0}
          >
            Calculate Rewards
          </Button>

          {calculationError && (
            <Alert variant="destructive">
              <AlertDescription>{calculationError}</AlertDescription>
            </Alert>
          )}

          {rewardValue && (
            <Alert>
              <AlertDescription>
                Estimated Reward Value: ${rewardValue.value}
                <br />
                Points Earned: {rewardValue.points.toLocaleString()}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default RewardCalculator;