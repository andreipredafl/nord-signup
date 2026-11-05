import type { SignupFormValues } from '~/services/signup'
import { signup } from '~/services/signup'

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
  isSubmitting: Ref<boolean>
  submitFailed: Ref<boolean>
  validateField: (field: SignupField) => boolean
  validateAll: () => SignupField[]
  clearError: (field: SignupField) => void
  submit: () => Promise<boolean>
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
  const isSubmitting = ref(false)
  const submitFailed = ref(false)

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

  async function submit(): Promise<boolean> {
    if (isSubmitting.value) {
      return false
    }
    isSubmitting.value = true
    submitFailed.value = false
    try {
      await signup({ ...form })
      return true
    }
    catch {
      submitFailed.value = true
      return false
    }
    finally {
      isSubmitting.value = false
    }
  }

  return { form, errors, isSubmitting, submitFailed, validateField, validateAll, clearError, submit }
}
