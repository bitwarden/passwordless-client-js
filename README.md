# Webauthn Passwordless js library

This library allows you to fast & without complexity add passwordless sign in (using fido2/webauthn) to your web
application.

[Read the paswordless documentation](https://docs.passwordless.dev/)

## Overview

This is what you need to do:

1. [Read the docs](https://docs.passwordless.dev/)
3. **You add our client side library** and call the function `passwordless.register` or `passwordless.signin`
4. **You add two very simple endpoints on your backend** that integrates to your existing user system (*set cookie,
   sessions, etc*) (and communicates secrets with our API).
5. You make a request between your clientside code and the verification endpoints on your backend to verify the
   registration or sign in.

## Get coding

To get started, add the library to your website (either as ES6 module or global):

NPM package:

```bash
yarn add @passwordlessdev/passwordless-client
```

```js
import { Client } from '@passwordlessdev/passwordless-client';
```

Normal script tag:

```html
<script src="https://cdn.passwordless.dev/dist/0.3.0/passwordless.iife.min.js" crossorigin="anonymous"></script>

<script>
var p = new Passwordless.Client({});
</script>
```

ES6 module script-tag:

```html
<script src="https://cdn.passwordless.dev/dist/0.3.0/passwordless.min.mjs" crossorigin="anonymous"></script>
```

ES6 module:

```js
import { Client } from "https://cdn.passwordless.dev/dist/0.3.0/passwordless.min.mjs"
```

UMD module:

```
https://cdn.passwordless.dev/dist/0.3.0/passwordless.umd.min.js
```

# Build this library

Run `yarn build`
