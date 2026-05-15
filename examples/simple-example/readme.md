# Client-JS example

A minimal Express + static-HTML demo that exercises the local
`@passwordlessdev/passwordless-client` build end-to-end. The frontend loads the
SDK from `/passwordless-client-js/iife/passwordless.iife.js`, which Express
serves out of this repo's top-level `dist/` directory — so changes you make in
`src/` show up here as soon as you rebuild.

Please read the documentation here: https://docs.passwordless.dev

## Setup

1. Get your own API keys here: https://admin.passwordless.dev/signup
2. Build the client-js bundles from the repo root so `/passwordless-client-js`
   has something to serve:
   ```
   cd ../..
   npm install
   npm run build
   cd examples/simple-example
   ```
3. Create a `.env` file in this directory and add the following variables:
   - `PASSWORDLESS_SECRET=<YOUR_API_SECRET>`: Your API secret from the
     administration console.
   - (optional) `PASSWORDLESS_API_URL=<YOUR_PASSWORDLESS_INSTANCE>` if you are
     self-hosting Passwordless.
4. Replace the following:
   - `public/index.html > YOUR_BACKEND_URL`: where this Express app is running
     (default `http://localhost:5024`).
   - `public/index.html > API_KEY`: your public API key from the administration
     console.
   - (optional) `public/index.html > PASSWORDLESS_API_URL`: the URL of your
     Passwordless instance if self-hosting.
5. Install dependencies and start the app:
   ```
   npm install
   npm run dev
   ```

Open <http://localhost:5024/> in a browser, register a passkey, then sign in
with the alias you used.

## Iterating on the SDK

Because this example serves `../../dist`, the typical edit loop is:

1. Edit `src/passwordless.ts` (or `src/types.ts`) at the repo root.
2. Run `npm run build` at the repo root to regenerate the bundles.
3. Refresh the browser tab — no example restart needed.
