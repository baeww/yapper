'use client'

import { use } from 'react'

async function getPrompt() {
  // In a real app, this would fetch from an API or database
  const prompts = [
    // "What's the most interesting thing you learned today?",
    "Describe your perfect day.",
    // "What's a challenge you're currently facing?",
    // "Share a recent accomplishment you're proud of.",
    // "What's your favorite childhood memory?",
  ]
  const randomIndex = Math.floor(Math.random() * prompts.length)
  return prompts[randomIndex]
}

export function DailyPromptComponent() {
  const prompt = use(getPrompt())

  return (
    <div className="bg-primary text-primary-foreground p-4 rounded-lg mb-8">
      <h2 className="text-xl font-semibold mb-2">Today's Prompt:</h2>
      <p className="text-lg">{prompt}</p>
    </div>
  )
}