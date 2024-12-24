const apiKey = import.meta.env.VITE_OPENAI_TOKEN
export const getFPSData = async (components, games) => {
  const dynamicPrompt = `
  Return ONLY a JSON array where each element is an object representing a game, and includes the estimated FPS for 1080p, 1440p, and 4K in high settings. If the user does not select a dedicated GPU, detect whether the processor supports gaming without a dedicated GPU. If it does not, return an error instead of the JSON array. No additional text or explanation.  

  Here is your input:
  {
    "components": ${JSON.stringify(components)},
    "games": ${JSON.stringify(games)}
  }

  Provide only the JSON array as output, return completly and without lines break
  `

  const url = 'https://chatgpt-42.p.rapidapi.com/gpt4'
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content: dynamicPrompt
        }
      ],
      web_access: false
    })
  }

  try {
    const response = await fetch(url, options)
    const result = await response.json()
    const parsedResponse = JSON.parse(result.result)
    return parsedResponse
  } catch (error) {
    return error
  }
}

// import OpenAI from 'openai'

// const openai = new OpenAI({
//   apiKey,
//   dangerouslyAllowBrowser: true
// })

// export const getFPSData = async (components, games) => {
//   const dynamicPrompt = `
//   Input: A JSON object with the following structure:
//   {
//     "components": {
//       "cpu": string,
//       "gpu": string,
//       "ram": string
//     },
//     "games": Array<string>
//   }

//   Output: Return ONLY a JSON array where each element is an object representing a game, and includes the estimated FPS for 1080p, 1440p, and 4K in high settings. If the user does not select a dedicated GPU, detect whether the processor supports gaming without a dedicated GPU. If it does not, return an error instead of the JSON array. No additional text or explanation.

//   Here is your input:
//   {
//     "components": ${JSON.stringify(components)},
//     "games": ${JSON.stringify(games)}
//   }

//   Provide only the JSON array as output.
//   `

//   try {
//     const completion = await openai.chat.completions.create({
//       model: 'o1-mini-2024-09-12',
//       messages: [
//         { role: 'system', content: 'You are an AI that generates FPS estimates for given hardware and games.' },
//         {
//           role: 'user',
//           content: dynamicPrompt,
//         },
//       ],
//     })
//     return completion.choices[0].message.content.trim()
//   } catch (e) {
//     return e
//   }
// }
