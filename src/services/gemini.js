import { GoogleGenerativeAI } from '@google/generative-ai'

const apiToken = import.meta.env.VITE_GEMINI_TOKEN
const genAI = new GoogleGenerativeAI(apiToken)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export const getFPSData = async (components, games) => {
  const dynamicPrompt = `
Input: A JSON object with the following structure:
{
  "components": {
    "cpu": string,
    "gpu": string,
    "ram": string
  },
  "games": Array<string>
}

Output: Return ONLY a JSON array where each element is an object representing a game, and includes the estimated FPS for 1080p, 1440p, and 4K in high settings. If the user does not select a dedicated GPU, detect whether the processor supports gaming without a dedicated GPU. If it does not, return an error instead of the JSON array. No additional text or explanation.  

Here is your input:
{
  "components": ${JSON.stringify(components)},
  "games": ${JSON.stringify(games)}
}

Provide only the JSON array as output.
`
  try {
    const data = await model.generateContent(dynamicPrompt)
    return data.response.text()
  } catch (error) {
    console.error('Error fetching FPS data:', error)
    return []
  }
}
