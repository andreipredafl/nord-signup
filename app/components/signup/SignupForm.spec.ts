import type { Input } from '@nordhealth/components'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import SignupForm from './SignupForm.vue'

// nord-button never finishes rendering inside a <form> in happy-dom, which hangs the run.
vi.mock('@nordhealth/components/lib/Button', () => ({}))

describe('SignupForm', () => {
  let wrapper: VueWrapper
  let email: Input
  let password: Input
  let passwordToggle: DOMWrapper<Element>

  async function type(input: Input, value: string): Promise<void> {
    input.value = value
    input.dispatchEvent(new Event('input'))
    await nextTick()
  }

  async function blur(input: Input): Promise<void> {
    input.dispatchEvent(new Event('blur'))
    await nextTick()
  }

  async function submit(): Promise<void> {
    await wrapper.find('form').trigger('submit')
  }

  beforeEach(async () => {
    wrapper = await mountSuspended(SignupForm, { attachTo: document.body })
    email = wrapper.find<Input>('nord-input[name="email"]').element
    password = wrapper.find<Input>('nord-input[name="password"]').element
    passwordToggle = wrapper.find('nord-input[name="password"] nord-button')
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('shows both errors and focuses the email on an empty submit', async () => {
    await submit()

    expect(email.error).toBe('Enter your email')
    expect(password.error).toBe('Enter a password')
    expect(document.activeElement).toBe(email)
  })

  it('focuses the password when it is the first invalid field', async () => {
    await type(email, 'user@example.com')

    await submit()

    expect(email.error).toBeFalsy()
    expect(password.error).toBe('Enter a password')
    expect(document.activeElement).toBe(password)
  })

  it('shows the error of an empty field on blur', async () => {
    await blur(email)

    expect(email.error).toBe('Enter your email')
    expect(password.error).toBeFalsy()
  })

  it('clears the error when typing in the field', async () => {
    await blur(email)

    await type(email, 'u')

    expect(email.error).toBeFalsy()
  })

  it('shows no errors on a valid submit', async () => {
    await type(email, 'user@example.com')
    await type(password, 'abcdefgh')

    await submit()

    expect(email.error).toBeFalsy()
    expect(password.error).toBeFalsy()
  })

  it('hides the password by default', () => {
    expect(password.type).toBe('password')
    expect(passwordToggle.text()).toBe('Show password')
  })

  it('shows the password when the toggle is clicked', async () => {
    await passwordToggle.trigger('click')

    expect(password.type).toBe('text')
    expect(passwordToggle.text()).toBe('Hide password')
  })

  it('hides the password again on a second click', async () => {
    await passwordToggle.trigger('click')
    await passwordToggle.trigger('click')

    expect(password.type).toBe('password')
    expect(passwordToggle.text()).toBe('Show password')
  })
})
