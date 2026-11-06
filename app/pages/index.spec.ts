import { useRouter } from '#imports'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SignupForm from '~/components/signup/SignupForm.vue'
import { useHasSignedUp } from '~/composables/useHasSignedUp'
import IndexPage from './index.vue'

// nord-button never finishes rendering inside a <form> in happy-dom, which hangs the run.
vi.mock('@nordhealth/components/lib/Button', () => ({}))

describe('signup page', () => {
  beforeEach(async () => {
    useHasSignedUp().value = false
    await useRouter().push('/')
  })

  it('opens the success page when the signup succeeds', async () => {
    const router = useRouter()
    const wrapper = await mountSuspended(IndexPage)

    wrapper.findComponent(SignupForm).vm.$emit('success')

    await vi.waitFor(() => {
      expect(router.currentRoute.value.path).toBe('/success')
    })
    wrapper.unmount()
  })
})
