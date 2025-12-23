import { describe, expect, it } from 'vitest'
import { randomBoolean, randomCategory, randomNumber } from '@/utils/randomizer'

describe('Randomizer Utils', () => {
  describe('randomBoolean', () => {
    it('should return a random booleaan value', () => {
      const results: boolean[] = []
      for (let i = 0; i < 100; i++) {
        results.push(randomBoolean())
      }

      const hasTrue = results.includes(true)
      const hasFalse = results.includes(false)

      expect(hasTrue).toBe(true)
      expect(hasFalse).toBe(true)
    })
  })

  describe('randomNumber', () => {
    it('should return a random number between 0 and 10', () => {
      const results: number[] = []
      for (let i = 0; i < 100; i++) {
        results.push(randomNumber())
      }

      expect(results.every(result => result >= 0 && result <= 10)).toBe(true)
    })

    it('should return a random number between 0 and 10 with decimal', () => {
      const results: number[] = []
      for (let i = 0; i < 100; i++) {
        results.push(randomNumber(0, 10, true))
      }

      expect(
        results.every(result => result >= 0 && result <= 10)
        && results.some(result => result.toString().includes('.')),
      ).toBe(true)
    })

    it('should return a random number with custom min and max', () => {
      const results: number[] = []
      for (let i = 0; i < 100; i++) {
        results.push(randomNumber(10, 20))
      }

      expect(results.every(result => result >= 10 && result <= 20)).toBe(true)
    })
  })

  describe('randomCategory', () => {
    const validCategories = new Set(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Western'])

    it('should return a string value', () => {
      const result = randomCategory()
      expect(typeof result).toBe('string')
    })

    it('should return a valid category', () => {
      const result = randomCategory()
      expect(validCategories.has(result)).toBe(true)
    })

    it('should return a random category more than once and all categories are valid', () => {
      const results: string[] = []
      for (let i = 0; i < 100; i++) {
        results.push(randomCategory())
      }

      expect(results.every(result => validCategories.has(result))).toBe(true)
    })
  })
})
