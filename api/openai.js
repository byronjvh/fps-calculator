export default async function handler (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { components, games } = req.body ?? {}
    const apiKey = process.env.API_KEY

    if (!apiKey) {
      return res.status(500).json({ error: 'Missing API key' })
    }

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
        messages: [{ role: 'user', content: dynamicPrompt }],
      }),
    }

    const response = await fetch(url, options)
    const result = await response.json()

    const msg = result?.choices?.[0]?.message || {}
    const content =
      typeof msg.content === 'string'
        ? msg.content
        : typeof msg.reasoning_content === 'string'
          ? msg.reasoning_content
          : null

    if (!content) {
      return res.status(502).json({ error: 'Invalid model response', raw: result })
    }

    return res.status(200).json({ content })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Unexpected error' })
  }
}
