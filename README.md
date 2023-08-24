![passwordless by bitwarden](./Screenshot%202023-04-28%20at%2011.50.52%20AM%20(2).png)

Welcome to Passwordless.dev by Bitwarden. Passwordless.dev is a software toolkit that helps developers bring FIDO2 WebAuthn passkeys to their end users. Provide passwordless authentication without the need to read W3C spoecification documentation, determine cryptography, or manage stored public keys. Passwordless with Bitwarden does this for you.

## Get started

Passwordless.dev consists of three key parts:

* An open-source client side library, used by your frontend to make requests to the end-user's browser WebAuthn API and requests to the passwordless.dev APIs.
* A public RESTful API used to complete FIDO2 WebAuthn cryptographic exchanges with the browser.
* a private RESTful API used  to initiate key registrations, verify signins, and retrieve keys for end-users.

To start, download the Passwordless.js library:

#### NPM package

Install the Passwordless.dev JS client:

```console
yarn add @passwordlessdev/passwordless-client
```

Or:

```console
npm install @passwordlessdev/passwordless-client
```

Next, your front end must import the library to call the methods:

```js
import { Client } from '@passwordlessdev/passwordless-client';
const p = new Client({apiKey: ""});
```

> The `api` parameter is optional when you use cloud hosting. For self-hosting, you'll need to point this to the Passwordless.dev back-end.

#### HTML

Install the Passwordless.dev JS client:

```html
<script src="https://cdn.passwordless.dev/dist/1.1.0/passwordless.iife.js" crossorigin="anonymous"></script>`
```

Next, your front end must import the libary to call the methods:

```html
<script>
const p = new Passwordless.Client({apiKey: ""});
</script>
```

Registering a token could look like:

```javascript
// Instantiate a passwordless client using your API public key.
const p = new Passwordless.Client({
    apiKey: "myapplication:public:4364b1a49a404b38b843fe3697b803c8"
});

// Fetch the registration token from the backend.
const backendUrl = "https://localhost:8002";
const registerToken = await fetch(backendUrl + "/create-token?userId" + userId).then(r => r.json());

// Register the token with the end-user's device.
const { token, error } = await p.register(registerToken);
```

## Build the library

Run:

```console
yarn build
```

## Obtaining your API credentials

Passwordless.dev's Admin Panel is a GUI for application and API key management. You can manage your users and receive your `public API key` and `private API key` (also known as secret) from the user interface.

To create an application, follow the instructions [here](https://docs.passwordless.dev/).

To create an account for yourself or your organization, visit [this link](https://admin.passwordless.dev/signup)

## Next steps

1. Call the function `register` or (e.g. `signinWithDiscoverable()`).
2. Add two endpoints to your backend that integrate to your existing user system (*set cookie, sessions, and more*) and will communicate secrets with our API.
3. Make a request between your clientside code and the verification endpoints on your backend to verify the registration or sign in.

We've written a more detailed guide, with more language examples and SDKs in the [Passwordless.dev](https://docs.passwordless.dev/guide/) documentation.

## Help

To talk to the passwordless team, send us an email at support@passwordless.dev

## References
- [Using the JavaScript client](https://docs.passwordless.dev/guide/frontend/javascript.html)

## Bitwarden

You can fine Bitwarden's other code repositories at https://github.com/bitwarden and more information on https://bitwarden.com/.

## Contribute

We encourage all contributions to docs.passwordless.dev, whether that's opening issues to request edits or additions, or adding them yourself in PRs.
