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
<script src="https://cdn.passwordless.dev/dist/0.1.0/passwordlessclient.iife.min.js" integrity="Qhz9YKzklMqHMn2W9sQhZBT9M+f1VpWAzqzjZ/SjWrnRq4+DclsMc8CdS8sz+rW5" crossorigin="anonymous"></script>

<script>
var p = new Passwordless.Client({});
</script>
```

ES6 module script-tag:
```html
<script src="https://cdn.passwordless.dev/dist/0.1.0/passwordlessclient.min.mjs" integrity="sha384-fE4M8MiZ1Ps1XtxCO4qB4m6Z9Lj9N7HRpe8IAajQSDFC9g7mBeVeQH2sC99fvBva" crossorigin="anonymous"></script>
```

ES6 module:
```js
import { Client } from "https://cdn.passwordless.dev/dist/0.1.0/passwordlessclient.min.mjs"
```

UMD module:
```
https://cdn.passwordless.dev/dist/0.1.0/passwordlessclient.umd.min.js
```

NPM package coming soon.

## Get your API Keys

To create a free account, please visit [Create Account](https://beta.passwordless.dev/create-account) or perform this http call:

```http
POST https://api.passwordless.dev/account/create?accountName=YOUR_ACCOUNT&adminEmail=YOUR_EMAIL@EXAMPLE.COM
```

It will return two keys, one public and one secret. Copy these keys to a secure location as they are only displayed once.

## Register a webauthn credential to user

```html
<script type="module">
    import { Client } from "https://cdn.passwordless.dev/dist/0.1.0/passwordlessclient.min.mjs";
    async function registerPasswordless(e) {
        e.preventDefault();

        var p = new Client({
            apiKey: "demo:public:xxx"
        });

        var myToken = await fetch("/example-backend/passwordless/token").then(r => r.text());

        try {
            await p.register(myToken);
        } catch (e) {
            console.error("Things went really bad: ", e);
        }
    }
</script>
```

Notice the `/example-backend/passwordless/token` call?
You need to add one backend endpoint to verify that the user is allowed to register a credential.

On your backend, perform this call:

```http
POST https://api.passwordless.dev/register/token
ApiSecret: demo:secret:yyy
Content-Type: application/json

{ "username": "anders@user.com", "displayName": "Anders" } 
```
It will return the token.

If `await p.register(myToken)` returns sucessfully, the credential has been registered.

## Sign in using webauthn

```html
<script type="module">
    import { Client } from "https://cdn.passwordless.dev/dist/0.1.0/passwordlessclient.min.mjs";
    async function handleSignInSubmit(e) {
        e.preventDefault();

        var p = new Client({
            apiKey: "demo:public:xxx"
        });

        var username = ""; // get username from form

        try {
            var token = await p.signin(username);
            var verifiedUser = await fetch("/example-backend/signin?token=" + token).then(r => r.json());
            console.log("User", verifiedUser);
        } catch (e) {
            console.error("Things went really bad: ", e);
        }
    }
</script>
```
Notice the `/example-backend/passwordless/token/verify` call?
You need to add one backend endpoint to verify the result from the api and set auth cookies.

On your backend, verify the token from signin with this api call:

```http
POST https://api.passwordless.dev/signin/verify
ApiSecret: demo:secret:yyy
Content-Type: application/json

{ "token": "zzz" }
```
... where zzz is the token you received from `p.signin(username)`.

The API call will return information about the user sign in:

```json
{
   "success":true,
   "username":"anders@user.com",
   "timestamp":"2020-08-21T16:42:48.5061807Z",
   "rpid":"example.com",
   "origin":"https://example.com"
}
```

# Build this library

Run `yarn build`
