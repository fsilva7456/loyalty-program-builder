import React, { useState } from 'react';

const LoyaltyBuilder = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    context: ''
  });
  const [analysis, setAnalysis] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  const sections = {
    overview: 'Program Overview',
    competitive: 'Competitive Analysis',
    mechanics: 'Program Mechanics',
    benefits: 'Business Benefits',
    implementation: 'Implementation Plan',
    risks: 'Risk Analysis',
    metrics: 'KPIs & Metrics',
    timeline: 'Timeline'
  };

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

  const regenerateSection = async () => {
    setLoading(true);
    // Implementation for regenerating specific section
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
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Company Information
              </h2>
              <p className="text-gray-600">
                Tell us about your company and we'll design a customized loyalty program
              </p>
            </div>
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
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <div className="bg-white rounded-lg shadow p-4">
                <nav className="space-y-2">
                  {Object.entries(sections).map(([key, title]) => (
                    <button
                      key={key}
                      onClick={() => setActiveSection(key)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeSection === key
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="col-span-9">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {sections[activeSection]}
                    </h2>
                    <div className="space-x-2">
                      <button
                        onClick={regenerateSection}
                        disabled={loading}
                        className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
                      >
                        Regenerate
                      </button>
                      <button
                        className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
                      >
                        Export
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="prose max-w-none">
                    {analysis[activeSection]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyBuilder;