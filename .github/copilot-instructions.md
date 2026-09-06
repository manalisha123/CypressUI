# Copilot instructions for this repository

- This repository uses Cypress for end-to-end testing of the donation journey.
- Keep automation aligned with the current donation-page flow and existing spec structure under cypress/e2e.
- Reuse fixture data and selector repositories from cypress/fixtures rather than duplicating hard-coded values.
- Prefer the shared custom commands in cypress/support/commands.js for fixture loading and common page setup.
- Favor stable, explicit assertions and avoid unnecessary waits or duplicated setup steps.
- Keep test code readable and maintainable by centralizing repeated logic instead of copying it across specs.
- When changing test behavior or selectors, verify with the relevant Cypress spec before finishing work.
