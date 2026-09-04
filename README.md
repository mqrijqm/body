# Body & Soul Pilates

Editorial website for Body & Soul Pilates, built with Next.js, React and TypeScript.

## Development

```bash
pnpm install
pnpm dev
```

Quality checks:

```bash
pnpm lint
pnpm build
```

Editable navigation, training types, booking rules, FAQ and business details are centralized in `data/site-content.ts`.

The direct booking URL and verified address, phone, email, working hours and map URL still need to be supplied by the client. Until the booking URL is confirmed, booking calls-to-action open the verified Instagram profile.

Photography and brand vectors are stored in `public/bhs`. Local editorial typefaces are stored in `public/fonts-bhs`.
