async function handleRegisterClick(e) {
  e.preventDefault();

  const alias = document.getElementById('alias').value;
  const username = document.getElementById('username').value;

  Status('Starting registering...');

  /**
   * Initiate the Passwordless client with your public api key
   */
  const p = new Passwordless.Client({
    apiKey: API_KEY,
    apiUrl: PASSWORDLESS_API_URL // optional parameter, defaults to 'https://v4.passwordless.dev' if not set. Only set this for self-hosting.
  });

  /**
   * Create token - Call your node backend to retrieve a token that we can use client-side to register a passkey to an alias
   */
  const backendRequest = await fetch(YOUR_BACKEND_URL + '/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      alias: alias,
      username: username
    })
  });

  const backendResponse = await backendRequest.json();
  if (!backendRequest.ok) {
    // If our demo backend did not respond with success, show error in UI
    Status(backendResponse);
    Status('Our backend failed while creating a token: ');
    return;
  }

  /**
   *  Register a key - The Passwordless API and browser creates and stores a passkey, based on the token.
   */
  try {
    const { token, error } = await p.register(backendResponse.token);
    if (token) {
      Status('Successfully registered WebAuthn. You can now sign in!');
    } else {
      Status(JSON.stringify(error, null, 2));
      Status('We failed to register a passkey: ');
    }

    /**
     * Done - the user can now sign in using the passkey
     */
  } catch (e) {
    console.error('Things went bad', e);
    Status('Things went bad, check console');
  }
}

document.getElementById('passwordless-register').addEventListener('click', handleRegisterClick);
