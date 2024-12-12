require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/analyze', async (req, res) => {
  const { companyData } = req.body;
  
  try {
    const analysis = await generateFullAnalysis(companyData);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function generateFullAnalysis(companyData) {
  const sections = {
    overview: `Create a comprehensive overview of a loyalty program for ${companyData.companyName}. Context: ${companyData.context}`,
    
    competitive: `Analyze the competitive landscape and existing loyalty programs in ${companyData.companyName}'s industry. Context: ${companyData.context}`,
    
    mechanics: `Design detailed loyalty program mechanics for ${companyData.companyName}, including points structure, tiers, and rewards. Context: ${companyData.context}`,
    
    benefits: `Analyze potential business benefits and ROI for implementing this loyalty program at ${companyData.companyName}. Context: ${companyData.context}`,
    
    implementation: `Create a detailed implementation plan for rolling out this loyalty program at ${companyData.companyName}. Context: ${companyData.context}`,
    
    risks: `Analyze potential risks and mitigation strategies for implementing this loyalty program. Context: ${companyData.context}`,
    
    metrics: `Define key performance indicators (KPIs) and success metrics for the loyalty program. Context: ${companyData.context}`,
    
    timeline: `Create a proposed timeline for implementing the loyalty program. Context: ${companyData.context}`
  };

  const results = {};

  for (const [section, prompt] of Object.entries(sections)) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are an expert in loyalty program design and implementation. Provide detailed, actionable insights."
      }, {
        role: "user",
        content: prompt
      }]
    });
    
    results[section] = response.choices[0].message.content;
  }

  return results;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
