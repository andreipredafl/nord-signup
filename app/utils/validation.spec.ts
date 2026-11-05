import { describe, expect, it } from 'vitest'
import { validateEmail, validatePassword } from './validation'

describe('validateEmail', () => {
  it('rejects an empty value', () => {
    expect(validateEmail('')).toBe('Enter your email')
  })

  it('rejects a whitespace-only value', () => {
    expect(validateEmail('   ')).toBe('Enter your email')
  })

  it('rejects an invalid format', () => {
    expect(validateEmail('user@example')).toBe('Enter a valid email')
  })

  it('accepts a valid email', () => {
    expect(validateEmail(' user@example.com ')).toBeUndefined()
  })
})

describe('validatePassword', () => {
  it('rejects an empty value', () => {
    expect(validatePassword('')).toBe('Enter a password')
  })

  it('rejects a whitespace-only value', () => {
    expect(validatePassword('        ')).toBe('Enter a password')
  })

  it('rejects a password under 8 characters', () => {
    expect(validatePassword('abcdefg')).toBe('Use at least 8 characters')
  })

  it('accepts a password of exactly 8 characters', () => {
    expect(validatePassword('abcdefgh')).toBeUndefined()
  })
})
