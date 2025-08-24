const apiKey = import.meta.env.VITE_API_KEY
export const getFPSData = async (components, games) => {
  const dynamicPrompt = `
  You are a JSON generator. 
  Return ONLY a valid JSON array. 
  ⚠️ Do not include explanations, markdown formatting, comments, or line breaks.

  Each element must be an object with this exact structure:
  {
    "name": "some game name",
    "fps": {
      "1080p": number,
      "1440p": number,
      "4K": number
    }
  }

  Rules:
  - Always provide approximations for FPS, even if the GPU is unknown. 
  - The ONLY case you return an error is when "No graphics card" is detected.
  - Do not include any keys other than "name" and "fps".
  - Output must be a single JSON array, compact (no whitespace, no line breaks).

  Here is your input:
  {
    "components": ${JSON.stringify(components)},
    "games": ${JSON.stringify(games)}
  }

  Output: JSON array only.
  `

  const url = 'https://deepseek-v31.p.rapidapi.com/'
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'deepseek-v31.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'DeepSeek-V3-0324',
      messages: [
        {
          role: 'user',
          content:
            dynamicPrompt,
        },
      ],
    }),
  }

  try {
    const response = await fetch(url, options)
    const result = await response.json()
    if (result.choices[0].message.content) {
      return result.choices[0].message.content
    } else {
      return result.choices[0].message.reasoning_content
    }
  } catch (error) {
    return error
  }
}
