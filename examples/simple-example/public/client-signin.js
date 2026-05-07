async function handleSigninClick(e) {
  e.preventDefault();
  const alias = document.getElementById('alias').value;

  Status('Starting sign in...');

  /**
   * Initiate the Passwordless client with your public api key
   */
  const p = new Passwordless.Client({
    apiKey: API_KEY,
    apiUrl: PASSWORDLESS_API_URL // optional parameter, defaults to 'https://v4.passwordless.dev' if not set. Only set this for self-hosting.
  });

  try {
    /**
     * Sign in - The Passwordless API and the browser initiates a sign in based on the alias
     */

    //var userId = await fetch("user/id").then(r => r.json()); // get user id from database

    const { token, error } = await p.signinWithAlias(alias);
    //const token = await p.signinWithId(486761564);
    if (error) {
      Status(JSON.stringify(error, null, 2));
      Status('Sign in failed, received the following error');
      return;
    }

    console.log('Received token', token);

    /**
     * Verify the sign in - Call your node backend to verify the token created from the sign in
     */
    const userResponse = await fetch(YOUR_BACKEND_URL + '/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    });

    if (!userResponse.ok) {
      const userError = await userResponse.json();
      Status(
        'Your backend failed while verifying the token: ' + JSON.stringify(userError, null, 2)
      );
      return;
    }

    const user = await userResponse.json();

    /**
     * Done - you can now check the user result for status, userid etc
     */
    Status('User details: ' + JSON.stringify(user, null, 2));
    Status('Yey! Succesfully signed in without a password!');

    console.log('User', user);
  } catch (e) {
    console.error('Things went really bad: ', e);
    Status('Things went bad, check console');
  }
}

document.getElementById('passwordless-signin').addEventListener('click', handleSigninClick);
