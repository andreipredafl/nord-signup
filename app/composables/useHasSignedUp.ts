// shared between pages, so the success page opens only after a signup
export function useHasSignedUp(): Ref<boolean> {
  return useState('hasSignedUp', () => false)
}
