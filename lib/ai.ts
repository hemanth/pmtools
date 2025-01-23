import { generateText } from 'ai'
import { createOpenAI as createGroq } from '@ai-sdk/openai'

// Initialize Groq client
const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY || '' // Access API key from environment variables
})

export async function generatePRD(
  productName: string,
  productDescription: string,
  targetAudience: string,
  businessGoals: string
) {
  const prompt = `Create a comprehensive Product Requirements Document (PRD) for the following product. Be specific, actionable, and focus on measurable outcomes.

Product Name: ${productName}
Product Description: ${productDescription}
Target Audience: ${targetAudience}
Business Goals: ${businessGoals}

Structure the PRD with these sections:

1. Overview
- High-level product vision
- Key differentiators
- Strategic alignment

2. Problem Statement
- Current pain points
- Market gaps
- User challenges to solve

3. Goals and Objectives
- Primary product goals
- Key performance indicators (KPIs)
- Target outcomes

4. Features and Requirements
- Core functionality
- Technical requirements
- User experience requirements
- Integration needs
- Security and compliance needs

5. Success Metrics
- User adoption metrics
- Business metrics
- Technical performance metrics
- Quality benchmarks

6. Timeline and Milestones
- Development phases
- Key deliverables
- Resource requirements
- Risk mitigation plans

Format the response in clean Markdown with clear headings, bullet points, and sections. Focus on clarity and actionability.`

  const result = await generateText({
    model: groq('llama-3.1-70b-versatile'),
    messages: [{ role: 'user', content: prompt }]
  })

  return result.text
}

export async function generateEpics(prd: string) {
  const prompt = `Based on the following PRD, generate a list of Epics (high-level user stories that represent major features or capabilities). Each Epic should be substantial enough to break down into multiple smaller user stories, but focused on a specific area of functionality.

${prd}

Generate 4-6 Epics that together cover the core product capabilities. For each Epic:

1. Give it a clear, descriptive title prefixed with "# Epic: "
2. Write a brief overview explaining the high-level goal and value proposition
3. List the key capabilities and requirements that fall under this Epic
4. Note any major dependencies or technical considerations
5. Indicate the expected user impact and business value

Format in clean markdown with proper headings and bullet points. Ensure Epics are:
- Independent of each other where possible
- Sized appropriately (not too broad or narrow)
- Aligned with the PRD's goals and requirements
- Clear enough for engineers to understand the scope`

  const result = await generateText({
    model: groq('llama-3.1-70b-versatile'),
    messages: [{ role: 'user', content: prompt }]
  })

  return result.text
}

export async function generateStories(epic: string) {
  const prompt = `Break down the following Epic into detailed user stories. For each story:

1. Use the format: "As a [type of user], I want [goal] so that [benefit]"
2. Include acceptance criteria with 3-4 specific conditions that must be met
3. Add notes on any technical considerations or dependencies
4. Estimate relative complexity (Low/Medium/High)

Epic:
${epic}

Generate 4-6 user stories that together would deliver the epic's functionality. Ensure the stories:
- Are independent and can be worked on separately
- Cover both happy path and edge cases
- Are specific and testable
- Include all key user roles/personas
- Follow a logical progression

Format in clean markdown with proper headings and spacing.`

  const result = await generateText({
    model: groq('llama-3.1-70b-versatile'),
    messages: [{ role: 'user', content: prompt }]
  })

  return result.text
}

