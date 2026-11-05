<script setup lang="ts">
import type { Input } from '@nordhealth/components'
import '@nordhealth/components/lib/Card'
import '@nordhealth/components/lib/Stack'
import '@nordhealth/components/lib/Input'
import '@nordhealth/components/lib/Checkbox'
import '@nordhealth/components/lib/Button'
import '@nordhealth/components/lib/Icon'
import '@nordhealth/components/lib/VisuallyHidden'
import '@nordhealth/components/lib/Banner'

const emit = defineEmits<{ success: [] }>()

const {
  form,
  errors,
  isSubmitting,
  submitFailed,
  validateField,
  validateAll,
  clearError,
  submit,
} = useSignupForm()

const isPasswordVisible = ref(false)

const inputs = {
  email: useTemplateRef<Input>('emailInput'),
  password: useTemplateRef<Input>('passwordInput'),
}

async function onSubmit(): Promise<void> {
  const [firstInvalid] = validateAll()
  if (firstInvalid) {
    inputs[firstInvalid].value?.focus()
    return
  }
  const accountCreated = await submit()
  if (accountCreated) {
    emit('success')
  }
}
</script>

<template>
  <nord-card padding="l">
    <h1 slot="header">
      Create your account
    </h1>
    <form
      novalidate
      @submit.prevent="onSubmit"
    >
      <nord-stack>
        <nord-banner
          v-if="submitFailed"
          variant="danger"
        >
          We couldn’t create your account. Please try again.
        </nord-banner>
        <nord-input
          ref="emailInput"
          v-model="form.email"
          label="Email"
          type="email"
          name="email"
          autocomplete="email"
          :error="errors.email"
          required
          expand
          @blur="validateField('email')"
          @input="clearError('email')"
        />
        <nord-input
          ref="passwordInput"
          v-model="form.password"
          label="Password"
          :type="isPasswordVisible ? 'text' : 'password'"
          name="password"
          autocomplete="new-password"
          hint="At least 8 characters"
          :error="errors.password"
          required
          expand
          @blur="validateField('password')"
          @input="clearError('password')"
        >
          <nord-button
            slot="end"
            type="button"
            square
            @mousedown.prevent
            @click="isPasswordVisible = !isPasswordVisible"
          >
            <nord-icon :name="isPasswordVisible ? 'interface-edit-off' : 'interface-edit-on'" />
            <nord-visually-hidden>
              {{ isPasswordVisible ? 'Hide password' : 'Show password' }}
            </nord-visually-hidden>
          </nord-button>
        </nord-input>
        <nord-checkbox
          v-model="form.marketingOptIn"
          type="checkbox"
          label="Send me occasional product updates and announcements"
          name="marketing"
        />
        <nord-button
          type="submit"
          variant="primary"
          expand
          :loading="isSubmitting"
        >
          Sign up
        </nord-button>
      </nord-stack>
      <nord-visually-hidden role="status">
        {{ isSubmitting ? 'Creating your account' : '' }}
      </nord-visually-hidden>
    </form>
  </nord-card>
</template>
