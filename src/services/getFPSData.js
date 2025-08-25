export const getFPSData = async (components, games) => {
  try {
    const resp = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ components, games }),
    })

    const data = await resp.json()
    if (!resp.ok) throw new Error(data?.error || 'Request failed')

    return data.content
  } catch (error) {
    return error
  }
}
