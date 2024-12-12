import React from 'react';
import { AlertCircle } from 'lucide-react';

const ProgramSection = ({ title, content, onRegenerate }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <button
          onClick={onRegenerate}
          className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Regenerate
        </button>
      </div>
      <div className="prose max-w-none">
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-600">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProgramSection;