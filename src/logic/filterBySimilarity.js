export function searchFilter (query, data) {
  // Normalizamos el término de búsqueda (minúsculas y eliminamos espacios extra)
  const normalizedQuery = query.toLowerCase().trim()

  // Creamos una expresión regular más estricta, permitiendo cierto margen para errores de tipeo.
  const regex = new RegExp(normalizedQuery.split('').join('.*?'), 'i')

  return data.filter(item => {
    const itemName = item.name.toLowerCase()
    // Comprobamos si la expresión regular coincide, pero también nos aseguramos de que los números no cambien tanto
    return itemName.match(regex) && normalizedQuery.split(' ').every(part => itemName.includes(part))
  })
}
