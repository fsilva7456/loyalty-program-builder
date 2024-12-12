import React, { useState } from 'react';

const LoyaltyBuilder = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    annualRevenue: '',
    customerBase: '',
    competitors: '',
    objectives: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const generateDocument = () => {
    console.log('Generating document...');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Loyalty Program Builder - Step {step}</h1>
        
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Program Objectives</label>
              <textarea
                name="objectives"
                value={formData.objectives}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-32"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleBack}
                className="w-1/2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="w-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded">
              <p className="text-sm text-blue-700">
                Review your loyalty program design before generating the final documentation.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleBack}
                className="w-1/2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={generateDocument}
                className="w-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Download Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyBuilder;