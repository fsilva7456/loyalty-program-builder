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
  const competitivePrompt = `Analyze the loyalty program landscape for ${companyData.industry} industry, focusing on competitors: ${companyData.competitors}. Include market trends and opportunities.`;
  
  const mechanicsPrompt = `Design a loyalty program for ${companyData.companyName} in the ${companyData.industry} industry with annual revenue of ${companyData.annualRevenue}. Include point structure, tiers, and redemption mechanics.`;
  
  const benefitsPrompt = `Analyze potential benefits and ROI for implementing this loyalty program at ${companyData.companyName}, considering their customer base of ${companyData.customerBase}.`;

  const [competitiveAnalysis, mechanics, benefits] = await Promise.all([
    openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: competitivePrompt }]
    }),
    openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: mechanicsPrompt }]
    }),
    openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: benefitsPrompt }]
    })
  ]);

  return {
    competitiveAnalysis: competitiveAnalysis.choices[0].message.content,
    mechanics: mechanics.choices[0].message.content,
    benefits: benefits.choices[0].message.content
  };
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));