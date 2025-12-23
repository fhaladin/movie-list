import { describe, expect, it } from 'vitest'
import api from '@/services/api'

describe('API Service', () => {
  it('should export api instance', () => {
    expect(api).toBeDefined()
    expect(typeof api).toBe('function')
  })

  it('should have baseURL', () => {
    expect(api.defaults.baseURL).toBe('https://jsonmock.hackerrank.com/api')
  })

  it('should have headers', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json')
    expect(api.defaults.headers['Accept']).toBe('application/json')
  })

  it('should have get method', () => {
    expect(api.get).toBeDefined()
    expect(typeof api.get).toBe('function')
  })
})
