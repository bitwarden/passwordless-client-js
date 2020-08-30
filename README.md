# Webauthn Passwordless js library

This library allows you to fast & without complexity add passwordless sign in (using fido2/webauthn) to your web application.

To get started, add the library to your website (either as ES6 module or global):

ES6 module:
```html
<script src="https://cdn.jsdelivr.net/gh/passwordless/passwordless-client-js@master/passwordlessClient.js" type="module"></script>
```

(For global, remove type="module" and access the global `window.GlobalPasswordlessClient`).

## Get API Keys

To create a free account, please perform this http call:

```
POST https://api.passwordless.dev/account/create?accountName=YOUR_ACCOUNT&adminEmail=YOUR_EMAIL@EXAMPLE.COM
```

It will return two keys, one public and one secret. Copy these keys to a secure location as they are only displayed once.

## Register a webauthn credential to user

```javascript
async function RegisterPasswordless(e) {
    e.preventDefault();

    var p = new PasswordlessClient({
        apiKey: "demo:public:xxx"
    });

    var myToken = await (await fetch("/example-backend/passwordless/token")).text();

    try {
        await p.register(myToken);
    } catch (e) {
        console.error("Things went really bad: ", e);
    }
}
```

Notice the `/example-backend/passwordless/token` call?
You need to add one backend endpoint to verify that the user is allowed to register a credential.

On your backend, perform this call:

```
POST https://api.passwordless.dev/register/token { username: "anders@user.com", displayName: "Anders", apiSecret: "demo:secret:yyy" } 
```
It will return the token.

If `await p.register(myToken)` returns sucessfully, the credential has been registered.

## Sign in using webauthn

```javascript
async function handleSignInSubmit(e) {
    e.preventDefault();

    var p = new PasswordlessClient({
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
```
Notice the `/example-backend/passwordless/token/verify` call?
You need to add one backend endpoint to verify the result from the api and set auth cookies.

On your backend, verify the token from signin with this api call:

```
POST httsp://api.passwordless.dev/signin/verify { token: "zzz", apiSecret: "demo:secret:yyy" }
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



