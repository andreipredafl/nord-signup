<script setup lang="ts">
import '@nordhealth/components/lib/Card'
import '@nordhealth/components/lib/Stack'
import '@nordhealth/components/lib/Input'
import '@nordhealth/components/lib/Checkbox'
import '@nordhealth/components/lib/Button'
</script>

<template>
  <nord-card>
    <h1 slot="header">
      Create your account
    </h1>
    <form novalidate>
      <nord-stack>
        <nord-input
          label="Email"
          type="email"
          name="email"
          autocomplete="email"
          required
          expand
        />
        <nord-input
          label="Password"
          type="password"
          name="password"
          autocomplete="new-password"
          hint="At least 8 characters"
          required
          expand
        />
        <nord-checkbox
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
