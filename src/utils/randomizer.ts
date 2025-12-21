export function randomBoolean (): boolean {
  return Math.random() < 0.5
}

export function randomNumber (min = 0, max = 10): number {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10
}
