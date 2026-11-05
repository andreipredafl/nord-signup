import { beforeEach, describe, expect, it, vi } from 'vitest'
import { signup } from '~/services/signup'
import { useSignupForm } from './useSignupForm'

vi.mock('~/services/signup')

describe('useSignupForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

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

  it('sends the form values to the signup service', async () => {
    const { form, submit } = useSignupForm()
    form.email = 'user@example.com'
    form.password = 'abcdefgh'
    form.marketingOptIn = true

    expect(await submit()).toBe(true)
    expect(signup).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'abcdefgh',
      marketingOptIn: true,
    })
  })

  it('is submitting only while the request is pending', async () => {
    const { isSubmitting, submit } = useSignupForm()

    const request = submit()
    expect(isSubmitting.value).toBe(true)

    await request
    expect(isSubmitting.value).toBe(false)
  })

  it('ignores a second submit while the first is pending', async () => {
    const { submit } = useSignupForm()

    const results = await Promise.all([submit(), submit()])

    expect(results).toEqual([true, false])
    expect(signup).toHaveBeenCalledTimes(1)
  })

  it('reports a failed request', async () => {
    vi.mocked(signup).mockRejectedValueOnce(new Error('network down'))
    const { isSubmitting, submitFailed, submit } = useSignupForm()

    expect(await submit()).toBe(false)
    expect(submitFailed.value).toBe(true)
    expect(isSubmitting.value).toBe(false)
  })

  it('clears the failure when the next attempt succeeds', async () => {
    vi.mocked(signup).mockRejectedValueOnce(new Error('network down'))
    const { submitFailed, submit } = useSignupForm()
    await submit()

    expect(await submit()).toBe(true)
    expect(submitFailed.value).toBe(false)
  })
})
