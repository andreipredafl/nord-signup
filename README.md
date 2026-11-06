# Nord signup

This is a signup form with a success page, built with Nuxt 4 and the [Nord Design System](https://nordhealth.design/) for the Nordhealth Senior Frontend Engineer assignment. The app renders only in the browser (`ssr: false`).

## Run it

The project needs Node 22 or newer and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

## How the form works

- The form validates a field on blur and clears its error when the user types again. The Nord input guideline asks to validate after the user has finished with a field
- Submit validates both fields, shows every error and moves the focus to the first invalid field
- While the request runs, the button shows its loading state and the form ignores a second submit
- If the request fails, a banner asks the user to try again and the form keeps the values. If it succeeds, the form emits `success` and the page navigates to `/success`
- The product updates checkbox is unchecked by default, and its value is sent with the signup request

Both fields are required. The form also checks the email format and a minimum of 8 characters for the password.

The rules are plain functions in `app/utils/validation.ts`. The state is in the `useSignupForm` composable, and `SignupForm.vue` has only the Nord markup.

## State and the mock API

There is no backend. `app/services/signup.ts` waits 800 ms and resolves, and a real API call would replace only that function.

Form state is local to the composable. The only shared state is a `hasSignedUp` flag in Nuxt `useState`. The page sets it after a signup, and a route middleware redirects `/success` to the form when the flag is not set.

## Nord usage

- Each file imports the Nord components it uses, as the Nord Vue docs recommend for tree shaking
- `nuxt.config.ts` tells Vue that `nord-*` tags are custom elements and adds Nord's `vue.d.ts`, so the tags are typed in templates
- Inputs use `v-model`. The checkbox also needs `type="checkbox"`
- Layout uses `nord-card` and `nord-stack`, plus the `n:` Tailwind utilities that Nord recommends for new projects
- ESLint runs `@nordhealth/eslint-plugin` and reports an unknown `n:` class as an error
- `@nordhealth/tokens` is a direct dependency because `@nordhealth/css/tailwind` imports it without declaring it

## Accessibility

- Errors go through the `error` attribute of `nord-input`, which links the message to the input
- The password toggle has a visually hidden label: "Show password" or "Hide password"
- Nord hides the button spinner from screen readers, so a hidden `role="status"` text announces the loading state
- `NuxtRouteAnnouncer` announces the page change, and each page has its own title

## Tests

The tests run on Vitest with `@nuxt/test-utils`. Each `.spec.ts` file sits next to the file it tests. The specs cover the validation rules, the composable, the mounted form, the page navigation and the route middleware.

`nord-button` inside a `<form>` hangs the test run in happy-dom, so the form specs mock the Button module and trigger `submit` on the form element. There are no end-to-end tests.

## Known limits

- The mock always succeeds, so the failure banner shows only in tests
- Every failed request shows the same banner. A real API would return field errors such as "email already used", and the form should show those on the field
- The `hasSignedUp` flag lives in memory, so a refresh on the success page goes back to the form
