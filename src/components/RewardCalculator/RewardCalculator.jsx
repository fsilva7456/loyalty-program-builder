import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RewardCalculator = () => {
  const [spendAmount, setSpendAmount] = useState('');
  const [pointsMultiplier, setPointsMultiplier] = useState('1');
  const [rewardValue, setRewardValue] = useState(0);
  
  const calculateRewards = () => {
    const spend = parseFloat(spendAmount) || 0;
    const multiplier = parseFloat(pointsMultiplier) || 1;
    const points = spend * multiplier;
    const value = points * 0.01; // Assuming 100 points = $1
    setRewardValue(value);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Reward Value Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Purchase Amount ($)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={spendAmount}
              onChange={(e) => setSpendAmount(e.target.value)}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Points Multiplier</label>
            <select
              className="w-full p-2 border rounded"
              value={pointsMultiplier}
              onChange={(e) => setPointsMultiplier(e.target.value)}
            >
              <option value="1">1x - Standard</option>
              <option value="2">2x - Silver</option>
              <option value="3">3x - Gold</option>
              <option value="4">4x - Platinum</option>
            </select>
          </div>

          <button
            onClick={calculateRewards}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Calculate Rewards
          </button>

          {rewardValue > 0 && (
            <Alert>
              <AlertDescription>
                Estimated Reward Value: ${rewardValue.toFixed(2)}
                <br />
                Points Earned: {(rewardValue * 100).toFixed(0)}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardCalculator;