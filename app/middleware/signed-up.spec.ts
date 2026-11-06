import { useRouter } from '#imports'
import { beforeEach, describe, expect, it } from 'vitest'
import { useHasSignedUp } from '~/composables/useHasSignedUp'

describe('signed-up middleware', () => {
  beforeEach(async () => {
    useHasSignedUp().value = false
    await useRouter().push('/')
  })

  it('sends a visitor who has not signed up back to the form', async () => {
    const router = useRouter()

    await router.push('/success')

    expect(router.currentRoute.value.path).toBe('/')
  })

  it('opens the success page after a signup', async () => {
    const router = useRouter()
    useHasSignedUp().value = true

    await router.push('/success')

    expect(router.currentRoute.value.path).toBe('/success')
  })
})
