export function randomOption (array) {
  return array[Math.floor(Math.random() * (array.length - 1))].name
}
