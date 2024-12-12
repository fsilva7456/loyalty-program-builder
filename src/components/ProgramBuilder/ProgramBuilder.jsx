import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Star, Award, Gift } from 'lucide-react';

const TierCard = ({ tier, onEdit }) => (
  <Card className="p-6 relative hover:shadow-lg transition-shadow cursor-pointer">
    <div className="absolute top-2 right-2">
      <Button variant="ghost" size="sm" onClick={() => onEdit(tier)}>
        Edit
      </Button>
    </div>
    <div className="flex items-center space-x-4 mb-4">
      {tier.icon}
      <h3 className="text-xl font-semibold">{tier.name}</h3>
    </div>
    <div className="space-y-3">
      {tier.benefits.map((benefit, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <span>{benefit}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 pt-4 border-t">
      <p className="text-sm text-gray-500">Required Points: {tier.points}</p>
    </div>
  </Card>
);

const ProgramBuilder = () => {
  const [tiers] = useState([
    {
      name: 'Bronze',
      icon: <Award className="text-orange-400" size={24} />,
      points: '0',
      benefits: [
        'Earn 1 point per $1',
        'Birthday reward',
        'Member-only events'
      ]
    },
    {
      name: 'Silver',
      icon: <Star className="text-gray-400" size={24} />,
      points: '1000',
      benefits: [
        'Earn 1.5 points per $1',
        'Free shipping',
        'Early access to sales',
        'Birthday double points'
      ]
    },
    {
      name: 'Gold',
      icon: <Crown className="text-yellow-400" size={24} />,
      points: '5000',
      benefits: [
        'Earn 2 points per $1',
        'Priority support',
        'Exclusive products',
        'Double points days',
        'Free returns'
      ]
    }
  ]);

  const handleEdit = (tier) => {
    console.log('Edit tier:', tier);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Program Tiers</h1>
          <p className="text-gray-500">Design your loyalty program structure</p>
        </div>
        <Button>
          <Gift className="mr-2" size={20} />
          Add New Tier
        </Button>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier, index) => (
          <TierCard key={index} tier={tier} onEdit={handleEdit} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors">
          <h3 className="font-semibold mb-2">Benefits Library</h3>
          <p className="text-sm text-gray-600">Choose from pre-made benefit templates</p>
        </Card>
        <Card className="p-6 bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors">
          <h3 className="font-semibold mb-2">Points Calculator</h3>
          <p className="text-sm text-gray-600">Configure point values and multipliers</p>
        </Card>
        <Card className="p-6 bg-green-50 cursor-pointer hover:bg-green-100 transition-colors">
          <h3 className="font-semibold mb-2">Preview Program</h3>
          <p className="text-sm text-gray-600">See how your program looks to members</p>
        </Card>
      </div>
    </div>
  );
};

export default ProgramBuilder;