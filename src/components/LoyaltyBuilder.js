import React, { useState } from 'react';
import ProgramSection from './ProgramSection';

const LoyaltyBuilder = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    context: ''
  });
  const [analysis, setAnalysis] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Program Overview' },
    { id: 'competitive', title: 'Competitive Analysis' },
    { id: 'mechanics', title: 'Program Mechanics' },
    { id: 'benefits', title: 'Business Benefits' },
    { id: 'implementation', title: 'Implementation Plan' },
    { id: 'risks', title: 'Risk Analysis' },
    { id: 'metrics', title: 'KPIs & Metrics' },
    { id: 'timeline', title: 'Timeline' }
  ];

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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">
          AI Loyalty Program Builder
        </h1>
        
        {step === 1 && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Company Information</h2>
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
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full p-3 rounded-lg text-white font-medium transition-colors
                  ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {loading ? 'Generating Program...' : 'Design Loyalty Program'}
              </button>
            </div>
          </div>
        )}

        {step === 2 && analysis && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <div className="bg-white rounded-lg shadow-lg p-4 sticky top-8">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors
                        ${activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="col-span-9">
              <div className="space-y-6">
                {sections
                  .filter(section => section.id === activeSection)
                  .map(section => (
                    <ProgramSection
                      key={section.id}
                      title={section.title}
                      content={analysis[section.id]}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyBuilder;