'use server'

import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function generatePRD(formData: FormData) {
  const productName = formData.get('productName')
  const productDescription = formData.get('productDescription')
  const targetAudience = formData.get('targetAudience')
  const businessGoals = formData.get('businessGoals')

  const prompt = `Create a detailed Product Requirements Document (PRD) for the following product:
  
Product Name: ${productName}
Product Description: ${productDescription}
Target Audience: ${targetAudience}
Business Goals: ${businessGoals}

Please structure the PRD with the following sections:
1. Overview
2. Problem Statement
3. Goals and Objectives
4. User Stories
5. Features and Requirements
6. Success Metrics
7. Timeline and Milestones`

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: [{ role: 'user', content: prompt }]
  })

  return result.text
}

export async function generateEpics(prd: string) {
  const prompt = `Based on the following PRD, generate a list of Epics (high-level user stories that can be broken down into smaller stories). Format them in markdown with clear titles and descriptions:

${prd}

Generate 4-6 Epics that cover the main features and requirements.`

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: [{ role: 'user', content: prompt }]
  })

  return result.text
}

export async function generateStories(epic: string) {
  const prompt = `Break down the following Epic into detailed user stories using the format:
"As a [type of user], I want [goal] so that [benefit]"

Epic:
${epic}

Generate 3-5 detailed user stories that would be needed to complete this epic.`

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: [{ role: 'user', content: prompt }]
  })

  return result.text
}

