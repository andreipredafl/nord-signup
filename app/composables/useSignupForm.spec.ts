import { describe, expect, it } from 'vitest'
import { useSignupForm } from './useSignupForm'

describe('useSignupForm', () => {
  it('shows both errors on an empty submit', () => {
    const { errors, validateAll } = useSignupForm()

    expect(validateAll()).toEqual(['email', 'password'])
    expect(errors).toEqual({
      email: 'Enter your email',
      password: 'Enter a password',
    })
  })

  it('passes a submit with valid values', () => {
    const { form, errors, validateAll } = useSignupForm()
    form.email = 'user@example.com'
    form.password = 'abcdefgh'

    expect(validateAll()).toEqual([])
    expect(errors).toEqual({ email: undefined, password: undefined })
  })

  it('leaves only the invalid field with an error on submit', () => {
    const { form, errors, validateAll } = useSignupForm()
    form.email = 'user@example.com'

    expect(validateAll()).toEqual(['password'])
    expect(errors).toEqual({ email: undefined, password: 'Enter a password' })
  })

  it('shows the error of an empty field on blur, and only that one', () => {
    const { errors, validateField } = useSignupForm()

    expect(validateField('email')).toBe(false)
    expect(errors).toEqual({ email: 'Enter your email', password: undefined })
  })

  it('reports a valid field on blur', () => {
    const { form, errors, validateField } = useSignupForm()
    form.password = 'abcdefgh'

    expect(validateField('password')).toBe(true)
    expect(errors.password).toBeUndefined()
  })

  it('clears only the error of the field being typed in', () => {
    const { errors, validateAll, clearError } = useSignupForm()
    validateAll()

    clearError('email')

    expect(errors).toEqual({ email: undefined, password: 'Enter a password' })
  })

  it('shows the error again on the next blur', () => {
    const { form, errors, validateField, clearError } = useSignupForm()
    validateField('email')
    form.email = 'user@example'
    clearError('email')

    validateField('email')

    expect(errors.email).toBe('Enter a valid email')
  })
})
