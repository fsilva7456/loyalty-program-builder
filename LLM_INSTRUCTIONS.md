# Loyalty Program Builder - LLM Integration Guide

## Overview
This application is designed to create customized loyalty programs using LLM capabilities. The system takes minimal input (company name and context) and generates comprehensive loyalty program designs.

## Core Components

### Frontend (React)
- Single-page application with step-based navigation
- Initial form collecting company details
- Dynamic content rendering with sectioned output
- Lazy loading of program sections to optimize performance

### Backend (Express)
- REST API endpoints for program generation
- OpenAI GPT-4 integration
- Structured prompt engineering

## LLM Interaction Guidelines

### Prompt Design
Each section uses carefully structured prompts to ensure consistent and useful output:

1. **Overview Section**
   ```text
   Create a concise overview of a loyalty program for [company].
   Focus on:
   1) Key Features
   2) Target Audience
   3) Core Benefits
   Context: [user provided context]
   ```

2. **Mechanics Section**
   ```text
   Design the basic mechanics for [company]'s loyalty program.
   Include only:
   1) Points Structure
   2) Reward Tiers
   3) Basic Earning Rules
   Context: [user provided context]
   ```

3. **Benefits Section**
   ```text
   List the top 3-4 business benefits of implementing this loyalty program for [company].
   Context: [user provided context]
   ```

### Response Formatting
- Keep responses structured with clear sections
- Use bullet points for better readability
- Limit each section to 500 tokens for optimal performance
- Include actionable insights and specific recommendations

## Important Considerations

1. **Context Utilization**
   - User-provided context should influence all aspects of the program design
   - Industry-specific terminology should be incorporated when available
   - Scale recommendations based on provided company size/scope

2. **Response Structure**
   - Begin each section with a brief summary
   - Use hierarchical organization (sections → subsections → points)
   - Include specific examples relevant to the company's industry

3. **Best Practices**
   - Keep recommendations practical and implementable
   - Include industry-standard metrics and KPIs
   - Consider scalability in program design
   - Provide clear rationale for suggested features

## System Prompts

The system uses these base instructions for all LLM interactions:
```text
You are an expert in loyalty program design. Provide detailed, structured responses
that can be easily displayed in a card-based UI. Use clear headings and bullet points.
Keep each section focused and actionable.
```

## Output Guidelines

1. **Format**
   - Use consistent formatting across sections
   - Separate distinct ideas with line breaks
   - Keep paragraphs concise (3-4 sentences max)

2. **Content**
   - Focus on actionable recommendations
   - Include specific examples
   - Provide clear implementation steps
   - Reference industry standards when applicable

3. **Style**
   - Professional but accessible language
   - Clear and concise explanations
   - Avoid technical jargon unless necessary

## Error Handling
If the LLM response doesn't match expected formatting or content guidelines:
1. Focus on core requirements first
2. Maintain structure even with partial information
3. Provide general recommendations if industry-specific details are unavailable

## Optimization Tips
1. Process essential sections first (Overview, Mechanics, Benefits)
2. Generate additional sections on demand
3. Keep responses focused and concise
4. Use consistent formatting for easy parsing
5. Include specific, actionable items in each section

## Security Notes
1. Avoid including sensitive information in prompts
2. Don't reference specific companies unless provided by user
3. Keep recommendations general enough to be secure
4. Don't include actual implementation details like code or security protocols