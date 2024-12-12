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

const prompts = {
  overview: (companyData) => `Create a concise overview of a loyalty program for ${companyData.companyName}. Focus on: 1) Key Features 2) Target Audience 3) Core Benefits. Context: ${companyData.context}`,
  
  mechanics: (companyData) => `Design the basic mechanics for ${companyData.companyName}'s loyalty program. Include only: 1) Points Structure 2) Reward Tiers 3) Basic Earning Rules. Context: ${companyData.context}`,
  
  benefits: (companyData) => `List the top 3-4 business benefits of implementing this loyalty program for ${companyData.companyName}. Context: ${companyData.context}`
};

app.post('/api/analyze', async (req, res) => {
  const { companyData } = req.body;
  
  try {
    // Generate initial analysis for essential sections
    const results = {};
    const essentialSections = ['overview', 'mechanics', 'benefits'];
    
    await Promise.all(
      essentialSections.map(async (section) => {
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [{
            role: "system",
            content: "Provide a concise, structured response with clear bullet points. Keep it brief but informative."
          }, {
            role: "user",
            content: prompts[section](companyData)
          }],
          max_tokens: 500, // Limit response length
          temperature: 0.7 // Slightly more focused responses
        });
        
        results[section] = response.choices[0].message.content;
      })
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for generating additional sections
app.post('/api/analyze/section', async (req, res) => {
  const { companyData, section } = req.body;
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "Provide a concise, structured response with clear bullet points."
      }, {
        role: "user",
        content: `Generate ${section} section for ${companyData.companyName}'s loyalty program. Context: ${companyData.context}`
      }],
      max_tokens: 500
    });
    
    res.json({ content: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));