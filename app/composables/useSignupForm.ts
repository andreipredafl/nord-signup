export interface SignupFormValues {
  email: string
  password: string
  marketingOptIn: boolean
}

// single source of the validated fields; the types below derive from it
// key order is the form order: the first invalid field gets the focus
const validators = {
  email: validateEmail,
  password: validatePassword,
}

export type SignupField = keyof typeof validators
export type SignupFormErrors = Partial<Record<SignupField, string>>

export interface UseSignupFormReturn {
  form: SignupFormValues
  errors: SignupFormErrors
  validateField: (field: SignupField) => boolean
  validateAll: () => SignupField[]
  clearError: (field: SignupField) => void
}

// Object.keys returns string[]; safe to cast, validators is a literal
const fields = Object.keys(validators) as SignupField[]

export function useSignupForm(): UseSignupFormReturn {
  const form = reactive<SignupFormValues>({
    email: '',
    password: '',
    marketingOptIn: false,
  })
  const errors = reactive<SignupFormErrors>({})

  function validateField(field: SignupField): boolean {
    const validate = validators[field]
    errors[field] = validate(form[field])
    return errors[field] === undefined
  }

  // returns the invalid fields. filter runs every validator, so all errors show
  function validateAll(): SignupField[] {
    return fields.filter(field => !validateField(field))
  }

  function clearError(field: SignupField): void {
    errors[field] = undefined
  }

  return { form, errors, validateField, validateAll, clearError }
}
