export default defineNuxtRouteMiddleware(() => {
  if (!useHasSignedUp().value) {
    return navigateTo('/')
  }
})
