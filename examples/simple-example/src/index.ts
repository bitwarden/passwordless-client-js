import express, { Express } from "express";
import dotenv from 'dotenv';
import {
    PasswordlessClient,
    PasswordlessOptions,
    RegisterOptions,
    RegisterTokenResponse, VerifiedUser
} from "@passwordlessdev/passwordless-nodejs";
import SignupRequest from "./SignupRequest";
import UserRepository from "./repositories/UserRepository";
import SigninRequest from "./SigninRequest";

dotenv.config()

const app: Express = express();
app.use(express.json());

app.post('/users/register', async (req, res) => {
    const signupRequest: SignupRequest = req.body;
    const repository: UserRepository = new UserRepository();
    let id: string = null;
    try {
        id = await repository.create(signupRequest.username);
    } catch {
        // do error handling, creating user failed.
    } finally {
        repository.close();
    }

    if (!id) {
        // Do not proceed to create a token, we failed to create a user.
        res.send(400);
    }

    let registerOptions = new RegisterOptions();
    registerOptions.userId = id;
    registerOptions.username = signupRequest.username;

    // Setting an alias is optional, you can define multiple unique aliases, but we're only setting one.
    if (signupRequest.alias) {
        registerOptions.aliases = new Array(1);
        registerOptions.aliases[0] = signupRequest.alias;
    }

    registerOptions.discoverable = true;

    const passwordlessOptions: PasswordlessOptions = {
        baseUrl: process.env.PASSWORDLESS_API_URL as string
    }
    const passwordlessClient = new PasswordlessClient(
        process.env.PASSWORDLESS_SECRET as string,
        passwordlessOptions
    );
    const token: RegisterTokenResponse = await passwordlessClient.createRegisterToken(registerOptions);
    res.send(token);
});

app.post('/users/login', async (req, res) => {
    const signinRequest: SigninRequest = req.body;

    // before we do anything, verify the token.
    const passwordlessOptions: PasswordlessOptions = {
        baseUrl: process.env.PASSWORDLESS_API_URL as string
    };
    const passwordlessClient = new PasswordlessClient(
        process.env.PASSWORDLESS_SECRET as string,
        passwordlessOptions
    );
    const verifiedToken: VerifiedUser = await passwordlessClient.verifyToken(signinRequest.token);

    if (!verifiedToken) {
        // if empty, invalid user
        res.status(400).send("invalid token");
        return;
    }

    const userRepository = new UserRepository();

    // retrieve the user to do something such as building a JWT token.
    const user = await userRepository.get(verifiedToken.userId);

    // do more here

    res.send(verifiedToken);
});

const server = app.listen(5024, () => {
    console.log("App running on 5024 port")
});

// Serve static/html files for the demo UI.
app.use(express.static("public"));

// Serve the local client-js build at /passwordless-client-js so the demo
// exercises this repo's source instead of the published CDN bundle. Resolved
// from the cwd (the example root); run `npm run build` at the repo root first.
app.use('/passwordless-client-js', express.static('../../dist'));

const shutdown = () => {
    console.log('Stopping ...');
    server.close(() => {
        console.log('Stopped');
    });
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
