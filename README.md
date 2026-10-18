# Bloom

Bloom is a quiet wellbeing companion: one thoughtful daily affirmation, with
the option of a separate gentle activity invitation. There are no accounts,
journaling, streaks, or analytics. Users can turn on one or more of eight Bloom
modes; curated affirmations and activity invitations reflect the selected
qualities.

## Run locally

Use Node.js 24 or newer.

```powershell
npm install
npm run dev
```

The Vite app runs at `http://localhost:5173` and proxies `/api` requests to the
push service on port `8787`. Both processes run together through `npm run dev`.

## Affirmation mix

The eight feeling-centered Bloom modes (Comfort, Calm, Joy, Care, Release,
Perspective, Wonder, and Connection) are multi-select toggles under **When I
need...**. At least one mode must remain selected; all selected modes receive
equal weight. A daily affirmation is always included; Settings lets you
optionally add a separate gentle activity invitation. Affirmations are
supportive statements about how you may feel; invitations offer optional
actions from the same feeling mode as the selected affirmation. Bloom selects
fixed, curated content from the selected feelings. The selected affirmation
and optional activity are stable for that local day and exact preference mix.
Existing saved mode choices are translated to the new
feeling-centered modes. Old cached affirmation selections are automatically
deleted. **Another Bloom** chooses a different affirmation from the same
selected modes and updates that day's cached affirmation for subsequent
notifications.

## Enable push notifications

Push delivery needs VAPID keys, a persistent Node process, and an HTTPS origin
in production. On iPhone, add Bloom to the Home Screen before enabling browser
notifications.

1. Generate a VAPID key pair:

   ```powershell
   npx web-push generate-vapid-keys
   ```

2. Copy `.env.example` to `.env` and set the generated keys as
   `BLOOM_VAPID_PUBLIC_KEY` and `BLOOM_VAPID_PRIVATE_KEY`. Keep `.env` secret;
   do not commit it.
3. Set `BLOOM_ORIGIN` to the exact site origin when deploying (for example,
   `https://bloom.example.com`).
4. Run `npm run dev` locally or `npm run build` followed by `npm start` in
   production. Put the production Node service behind HTTPS and retain the
   `data` directory between restarts.
5. Open Settings in Bloom and choose **Enable push notifications**. The browser
   will ask for notification permission.

When the page is open, Bloom shows a prompt at each selected arrival. Open the
new Bloom immediately or delay the prompt to a later time that day. A delayed
prompt is saved in that browser and appears when Bloom is open. The server
checks selected times every 15 seconds and sends your selected affirmation
and/or activity as a push notification when push is enabled. Keep Bloom open
for in-page prompts and the server running for scheduled push delivery. Missed
push times while the server is offline are not replayed. Browser,
operating-system, and push-provider delivery can be delayed.

## Privacy

Bloom does not ask for an account and does not include analytics. Affirmations
come from the local curated library; no AI provider or external message service
is used.

To deliver notifications, the server stores a browser push subscription, the
eight mode selections, selected content types, selected times, and the device
time zone in a local SQLite database. Today's selected affirmation is cached
so scheduled notifications match the home screen; old entries are deleted
automatically. Settings also stay in browser local storage. Turning
notifications off removes the subscription and its server-side schedule. The
database is created at `data/bloom.sqlite` by default; set `BLOOM_DB_PATH` to
choose another persistent location.

## Commands

- `npm run dev` — start the Vite app and local push service
- `npm run build` — type-check and build the app
- `npm start` — serve the production build and run the push scheduler
- `npm test` — test local-time schedule and delivery behavior
- `npm run lint` — lint the project
