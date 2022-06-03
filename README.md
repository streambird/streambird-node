# Streambird Node.js Library

The official Node.js library for integrating with the Streambird API.

Documentation can be found at <https://developers.streambird.io/>

This library is only for use on the backend, as it uses Streambird API tokens which must be kept secret.

This version uses Streambird API v1.0.

## Installation

For npm:

```sh
npm install streambird
```

For Yarn:

```sh
yarn add streambird
```

## Getting started

Require the package:

```js
const { Streambird } = require("streambird");
```

For TypeScript users, types are available as well:

```ts
import { Streambird, User, StreambirdApiError } from "streambird";
```

Configure with your API token and region:

```js
const streambird = new Streambird({
  apiKey: process.env.STREAMBIRD_API_TOKEN,
});
```

Using with `async`/`await` (in an `async function`):

```js
try {
  const user = await streambird.users.create({
    firstName: "Wayne",
    middleName: "Payne",
    lastName: "Schmein",
    email: "wayneps@streambird.io",
    phoneNumber: "+15555551000",
    requiresVerification: true,
  });

  return user;
} catch (error) {
  if (error instanceof StreambirdApiError) {
    console.log(error.message);
    console.log(error.type);
    console.log(error.isClientError());
  } else {
    console.log(error.message);
  }
}
```

Using with promises:

```js
streambird.users
  .create({
    firstName: "Wayne",
    middleName: "Payne",
    lastName: "Schmein",
    email: "wayneps@streambird.io",
    phoneNumber: "+15555551000",
    requiresVerification: true,
  })
  .then(user =>
    // Handle successfully created user.
  )
  .catch(error => {
    // Handle error.
  });
```

## Response format

Most responses will be normal JavaScript objects. Property names will be in camelCase rather than snake_case, including property names in nested objects.

```js
const user = await streambird.users.create({
  firstName: "Wayne",
  middleName: "Payne",
  lastName: "Schmein",
  email: "wayneps@streambird.io",
  phoneNumber: "+15555551000",
  requiresVerification: true,
});

console.log(user);
{
  userId: "user_27omXGknF0uVnO4fpVLbP6cVM8v",
  appId: "0a6aa9d3-2786-461c-950e-c4b9e00c826e",
  firstName: "Wayne",
  middleName: "Payne",
  lastName: "Schmein",
  status: "pending",
  active: false,
  updatedAt: 1649994850,
  createdAt: 1649994850,
  emails: null,
  phoneNumbers: null,
  wallets: null,
  emailId: "email_27omXJMY3TqFKQrlZLNFDoifWwV",
  phoneNumberId: "pn_27omXFBBiC5JC0UFNmA2X5JtGg3",
  requiresVerification: true,
  email: "wayneps@streambird.io",
  phoneNumber: "+15555551000"
}
```

## More documentation

More documentation and code examples can be found at <https://developers.streambird.io/>
