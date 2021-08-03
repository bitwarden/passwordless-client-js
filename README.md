# Webauthn Passwordless js library

This library allows you to fast & without complexity add passwordless sign in (using fido2/webauthn) to your web application.

[Read the paswordless documentation](https://docs.passwordless.dev/)

## Overview

This is what you need to do:

1. [Read the docs](https://docs.passwordless.dev/)
3. **You add our client side library** and call the function `passwordless.register` or `passwordless.signin`
4. **You add two very simple endpoints on your backend** that integrates to your existing user system (*set cookie, sessions, etc*) (and communicates secrets with our API).
5. You make a request between your clientside code and the verification endpoints on your backend to verify the registration or sign in.
 
## Get coding
To get started, add the library to your website (either as ES6 module or global):

NPM package:
```bash
yarn add passwordless-client-js
```

```js
import { Client } from 'passwordless-client-js';
```

Normal script tag:
```html
<script src="https://cdn.passwordless.dev/dist/0.2.0/passwordlessclient.iife.min.js" integrity="Qhz9YKzklMqHMn2W9sQhZBT9M+f1VpWAzqzjZ/SjWrnRq4+DclsMc8CdS8sz+rW5" crossorigin="anonymous"></script>

<script>
var p = new Passwordless.Client({});
</script>
```

ES6 module script-tag:
```html
<script src="https://cdn.passwordless.dev/dist/0.2.0/passwordlessclient.min.mjs" integrity="sha384-fE4M8MiZ1Ps1XtxCO4qB4m6Z9Lj9N7HRpe8IAajQSDFC9g7mBeVeQH2sC99fvBva" crossorigin="anonymous"></script>
```

ES6 module:
```js
import { Client } from "https://cdn.passwordless.dev/dist/0.2.0/passwordlessclient.min.mjs"
```

UMD module:
```
https://cdn.passwordless.dev/dist/0.2.0/passwordlessclient.umd.min.js
```

# Build this library

Run `yarn build`
