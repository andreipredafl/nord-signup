<script setup lang="ts">
import type { Input } from '@nordhealth/components'
import '@nordhealth/components/lib/Card'
import '@nordhealth/components/lib/Stack'
import '@nordhealth/components/lib/Input'
import '@nordhealth/components/lib/Checkbox'
import '@nordhealth/components/lib/Button'

const { form, errors, validateField, validateAll, clearError } = useSignupForm()

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
          type="password"
          name="password"
          autocomplete="new-password"
          hint="At least 8 characters"
          :error="errors.password"
          required
          expand
          @blur="validateField('password')"
          @input="clearError('password')"
        />
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
