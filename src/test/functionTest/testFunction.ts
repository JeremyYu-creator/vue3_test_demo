export function increment (current: number, max = 10) {
  if (current < max) {
    return current + 1
  }
  return current
}