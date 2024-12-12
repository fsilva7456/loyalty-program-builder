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
    const analysis = await generateAnalysis(companyData);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function generateAnalysis(companyData) {
  const prompts = {
    overview: `Create a structured overview of a loyalty program for ${companyData.companyName}. Break down the response into clear sections for: Program Goals, Key Features, Target Audience, and Expected Outcomes. Context: ${companyData.context}`,
    
    competitive: `Analyze the competitive landscape for ${companyData.companyName}'s loyalty program. Structure the response into: Market Overview, Key Competitors Analysis, Industry Trends, and Differentiation Opportunities. Context: ${companyData.context}`,
    
    mechanics: `Design the core mechanics for ${companyData.companyName}'s loyalty program. Include sections for: Points Structure, Reward Tiers, Earning Mechanisms, and Redemption Options. Make it specific to their industry. Context: ${companyData.context}`,
    
    benefits: `Outline the business benefits of implementing this loyalty program for ${companyData.companyName}. Structure into: Revenue Impact, Customer Retention Benefits, Data & Insights Value, and Brand Enhancement. Context: ${companyData.context}`,
    
    implementation: `Create a structured implementation plan for ${companyData.companyName}'s loyalty program. Include: Technical Requirements, Team Structure, Training Needs, and Launch Strategy. Context: ${companyData.context}`,
    
    risks: `Analyze potential risks for ${companyData.companyName}'s loyalty program. Cover: Technical Risks, Operational Risks, Market Risks, and Mitigation Strategies. Context: ${companyData.context}`,
    
    metrics: `Define key performance indicators for ${companyData.companyName}'s loyalty program. Include: Engagement Metrics, Financial Metrics, Customer Satisfaction Metrics, and Program Health Metrics. Context: ${companyData.context}`,
    
    timeline: `Create a phased timeline for implementing ${companyData.companyName}'s loyalty program. Break down into: Planning Phase, Development Phase, Testing Phase, and Launch Phase with specific milestones. Context: ${companyData.context}`
  };

  const results = {};

  for (const [section, prompt] of Object.entries(prompts)) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are an expert in loyalty program design. Provide detailed, structured responses that can be easily displayed in a card-based UI. Use clear headings and bullet points. Keep each section focused and actionable."
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