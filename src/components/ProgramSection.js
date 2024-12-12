import React from 'react';

const ProgramSection = ({ title, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-900 border-b pb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.split('\n\n').map((paragraph, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">{paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramSection;