import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const CaseStudy = ({ title, industry, challenge, solution, results }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto my-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="text-sm text-gray-500">Industry: {industry}</div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Challenge</h3>
          <p className="text-gray-700">{challenge}</p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Solution</h3>
          <p className="text-gray-700">{solution}</p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Results</h3>
          <ul className="list-disc pl-5 space-y-1">
            {results.map((result, index) => (
              <li key={index} className="text-gray-700">{result}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStudy;