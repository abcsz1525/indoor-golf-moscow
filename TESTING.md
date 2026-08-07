# Testing

Tests turn fast changes into safe changes. The goal is complete coverage of business-critical paths: lead delivery, booking forms, routing, metadata and server security contracts.

## Commands

- `npm test` — run all Vitest tests once.
- `npm run test:watch` — run tests while editing.
- `npm run lint` — check TypeScript and React rules.
- `npm run build` — type-check, build and generate route-specific HTML metadata.
- `npm run check` — run lint, tests and production build in the same order as CI.

## Conventions

- Test files live next to the code as `*.test.ts` or `*.test.tsx`.
- Test observable behavior, not implementation details.
- Every bug fix should include a regression test when the behavior can be automated.
- External services such as Telegram and YClients must be mocked. Tests must never send real requests or contain credentials.
- Pure visual changes are verified with browser QA and screenshots.
