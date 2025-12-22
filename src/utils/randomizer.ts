export function randomBoolean (): boolean {
  return Math.random() < 0.5
}

export function randomNumber (min = 0, max = 10, decimal = false): number {
  const number = Math.round((Math.random() * (max - min) + min) * 10) / 10
  return decimal ? number : Math.round(number)
}

export function randomCategory (): string {
  const categories: string[] = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Western']
  return categories[randomNumber(0, categories.length - 1, false)] as string
}
