const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value: string): string | undefined {
  const email = value.trim()
  if (email === '') {
    return 'Enter your email'
  }
  if (!emailPattern.test(email)) {
    return 'Enter a valid email'
  }
  return undefined
}

export function validatePassword(value: string): string | undefined {
  const password = value.trim()
  if (password === '') {
    return 'Enter a password'
  }
  if (password.length < 8) {
    return 'Use at least 8 characters'
  }
  return undefined
}
