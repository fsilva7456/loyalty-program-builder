import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Coffee, Plane, Star, ChevronRight, Search } from 'lucide-react';

const TemplateCard = ({ template, onSelect }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            {template.icon}
          </div>
          <h3 className="text-lg font-semibold">{template.name}</h3>
        </div>
        <div className="flex items-center">
          {[...Array(template.rating)].map((_, i) => (
            <Star key={i} size={16} className="text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{template.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {template.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-gray-500">
          {template.usageCount} businesses using this template
        </div>
        <Button onClick={() => onSelect(template)}>
          Use Template
          <ChevronRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  </Card>
);

const templates = [
  {
    name: 'Retail Rewards',
    icon: <ShoppingBag className="text-blue-500" size={24} />,
    description: 'Perfect for retail stores with point-based rewards and tier benefits',
    tags: ['Retail', 'Points', 'Tiers'],
    rating: 5,
    usageCount: '2.3k',
    industry: 'retail'
  },
  {
    name: 'Café Loyalty',
    icon: <Coffee className="text-brown-500" size={24} />,
    description: 'Digital punch card system with bonus rewards for coffee shops',
    tags: ['Food & Beverage', 'Punch Card', 'Mobile'],
    rating: 4,
    usageCount: '1.8k',
    industry: 'food'
  },
  {
    name: 'Travel Miles',
    icon: <Plane className="text-blue-500" size={24} />,
    description: 'Mile-based rewards program for travel and hospitality businesses',
    tags: ['Travel', 'Miles', 'Premium'],
    rating: 5,
    usageCount: '950',
    industry: 'travel'
  }
];

const industries = [
  { label: 'All', value: 'all' },
  { label: 'Retail', value: 'retail' },
  { label: 'Food & Beverage', value: 'food' },
  { label: 'Travel', value: 'travel' }
];

const TemplatesGallery = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(template => {
    const matchesIndustry = selectedIndustry === 'all' || template.industry === selectedIndustry;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesIndustry && matchesSearch;
  });

  const handleSelect = (template) => {
    console.log('Selected template:', template);
    // Handle template selection
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Program Templates</h1>
          <p className="text-gray-500">Start with a pre-built template for your industry</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          {industries.map(industry => (
            <Button
              key={industry.value}
              variant={selectedIndustry === industry.value ? 'default' : 'outline'}
              onClick={() => setSelectedIndustry(industry.value)}
            >
              {industry.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <TemplateCard
            key={index}
            template={template}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplatesGallery;