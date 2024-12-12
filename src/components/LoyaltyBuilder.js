import React, { useState } from 'react';

const LoyaltyBuilder = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    context: ''
  });
  const [analysis, setAnalysis] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerate = async () => {
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
      setStep(2);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
          AI Loyalty Program Builder
        </h1>
        
        {step === 1 && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g., Acme Corporation"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Additional Context
                </label>
                <textarea
                  name="context"
                  value={formData.context}
                  onChange={handleInputChange}
                  placeholder="Tell us about your industry, customers, goals, or any specific requirements..."
                  className="w-full h-32 p-2 border rounded"
                />
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full p-2 rounded text-white ${loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {loading ? 'Generating Program...' : 'Design Loyalty Program'}
              </button>
            </div>
          </div>
        )}

        {step === 2 && analysis && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Loyalty Program</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Program Overview</h3>
                <p className="text-gray-700">{analysis.overview}</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Competitive Analysis</h3>
                <p className="text-gray-700">{analysis.competitive}</p>
              </div>
              {/* Add more sections as needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyBuilder;