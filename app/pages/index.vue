<script setup lang="ts">
useHead({ title: 'Sign up' })

const hasSignedUp = useHasSignedUp()

async function onSignupSuccess(): Promise<void> {
  hasSignedUp.value = true
  await navigateTo('/success')
}
</script>

<template>
  <main class="n:p-6">
    <SignupForm
      class="n:mx-auto n:mbs-18 n:container-xxs"
      @success="onSignupSuccess"
    />
  </main>
</template>
