export interface SignupFormValues {
  email: string
  password: string
  marketingOptIn: boolean
}

// simulated request: this exercise has no backend
// a real API call would replace the body, callers stay unchanged
export async function signup(_values: SignupFormValues): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 800))
}
