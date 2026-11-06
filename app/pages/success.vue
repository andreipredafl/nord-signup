<script setup lang="ts">
import '@nordhealth/components/lib/Card'
import '@nordhealth/components/lib/Banner'

definePageMeta({ middleware: 'signed-up' })
useHead({ title: 'Account created' })
</script>

<template>
  <main class="n:p-6">
    <nord-card
      class="n:mx-auto n:mbs-18 n:container-xxs"
      padding="l"
    >
      <h1 slot="header">
        Account created
      </h1>
      <nord-banner variant="success">
        Thanks for signing up
      </nord-banner>
    </nord-card>
  </main>
</template>
