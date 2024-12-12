import React, { useState } from 'react';

const LoyaltyBuilder = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    annualRevenue: '',
    customerBase: '',
    competitors: '',
    objectives: ''
  });

  const [analysis, setAnalysis] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = async () => {
    if (step === 1) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ companyData: formData }),
        });
        const data = await response.json();
        setAnalysis(data);
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const generateDocument = () => {
    const content = `
# Loyalty Program Analysis for ${formData.companyName}

## Competitive Analysis
${analysis.competitiveAnalysis}

## Loyalty Program Mechanics
${analysis.mechanics}

## Expected Benefits
${analysis.benefits}
    `;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'loyalty-program-analysis.md';
    a.click();
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
            <div>
              <label className="block text-sm font-medium mb-1">Annual Revenue</label>
              <input
                type="text"
                name="annualRevenue"
                value={formData.annualRevenue}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Customer Base Size</label>
              <input
                type="text"
                name="customerBase"
                value={formData.customerBase}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Key Competitors</label>
              <input
                type="text"
                name="competitors"
                value={formData.competitors}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Comma-separated list"
              />
            </div>
            <button
              onClick={handleNext}
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Analyzing...' : 'Generate Analysis'}
            </button>
          </div>
        )}

        {step === 2 && analysis && (
          <div className="space-y-4">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Competitive Analysis</h2>
                <div className="bg-gray-50 p-4 rounded">
                  {analysis.competitiveAnalysis}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Suggested Loyalty Mechanics</h2>
                <div className="bg-gray-50 p-4 rounded">
                  {analysis.mechanics}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Potential Benefits</h2>
                <div className="bg-gray-50 p-4 rounded">
                  {analysis.benefits}
                </div>
              </div>
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
                Download Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyBuilder;