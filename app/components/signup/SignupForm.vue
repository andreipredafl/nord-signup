<script setup lang="ts">
import type { Input } from '@nordhealth/components'
import '@nordhealth/components/lib/Card'
import '@nordhealth/components/lib/Stack'
import '@nordhealth/components/lib/Input'
import '@nordhealth/components/lib/Checkbox'
import '@nordhealth/components/lib/Button'
import '@nordhealth/components/lib/Icon'
import '@nordhealth/components/lib/VisuallyHidden'

const { form, errors, validateField, validateAll, clearError } = useSignupForm()

const isPasswordVisible = ref(false)

const inputs = {
  email: useTemplateRef<Input>('emailInput'),
  password: useTemplateRef<Input>('passwordInput'),
}

function onSubmit(): void {
  const [firstInvalid] = validateAll()
  if (firstInvalid) {
    inputs[firstInvalid].value?.focus()
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
        >
          Sign up
        </nord-button>
      </nord-stack>
    </form>
  </nord-card>
</template>
