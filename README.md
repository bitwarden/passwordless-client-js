

![passwordless by bitwarden](./Screenshot%202023-04-28%20at%2011.50.52%20AM%20(2).png)

Welcome to Passwordless.dev by Bitwarden. Passwordless.dev is a software toolkit that helps developers bring FIDO2 WebAuthn passkeys to their end users. Provide passwordless authentication without the need to read W3C spoecification documentation, determine cryptography, or manage stored public keys. Passwordless with Bitwarden does this for you.

## Get started
Passwordless.dev consists of three key parts:

* An open-source client side library, used by your frontend to make requests to the end-user's browser WebAuthn API and requests to the passwordless.dev APIs.
* A public RESTful API used to compelte FIDO2 WebAuthn cryptographic exchanges with the browser.
* a private RESTful API used  to initiate key registrations, verify signins, and retrieve keys for end-users.

To start, download the Passwordless.js library:

#### NPM package
Install the Passwordless.dev JS client:

```console
yarn add @passwordlessdev/passwordless-client
```

Next, your front end must import the libary to call the methods:

```js
import { Client } from '@passwordlessdev/passwordless-client';
const p = new Client({apiKey: ""});
```
#### HTML
Install the Passwordless.dev JS client:

```html
<script src="https://cdn.passwordless.dev/dist/0.4.0/passwordless.iife.js" crossorigin="anonymous"></script>`
```
Next, your front end must import the libary to call the methods:
```html
<script>
const p = new Passwordless.Client({});
</script>
```

## Build the library
Run:
```console
yarn build
```

## Get API credentials
Passwordless.dev's Admin Panel is a GUI for application and API key management. You can manage your users and receive your `publicKey` and `apiSecret` from the interface.

Register at [with the admin console](https://adminconsole-devtest.azurewebsites.net/Account/Login)

## Next steps

1. Call the function `register` or (e.g. `signinWithDiscoverable()`).
2. Add two endpoints to your backend that integrate to your ecisting user system (*set cookie, sessions, and more*) and will communicate secrets with our API.
3. Make a reques request between your clientside code and the verification endpoints on your backend to verify the registration or sign in.

Now that your libary has been built and you can run passwordless, review the Passwordless.dev [docs](https://docs.passwordless.dev/guide/) for additional infomraiton including alternitive language integrations, admin console management, and more!

## Help
To talk to the passwordless team, send us an email at support@passwordless.dev

## Bitwarden
You can fine Bitwarden's other code repositories at https://github.com/bitwarden and more infomration on https://bitwarden.com/.

## Contribute

We encourage all contributions to docs.passwordless.dev, whether that's opening issues to request edits or additions, or adding them yourself in PRs.
