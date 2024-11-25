## Prerequisites

You will need [Node.js](https://nodejs.org) version 20.0 or greater installed on your system.

## Setup

Get the code by either cloning this repository using git

```
git clone https://github.com/talhafiaz09/ai-powered-writing-assistant.git
```

Once downloaded, open the terminal in the project directory, and install dependencies with:

```
yarn install
```

The app should now be up and running at http://localhost:3000

## Production

The app is also deployed to vercel and is accessible at:

https://ai-powered-writing-assistant-pink.vercel.app/

## Functionalities

1. Rewrites a given sentences with specific tone and length if provided.
2. Provides extra explanation of how the rewritten version improves the original.
3. Maintains history by saving it in local storage.
4. Allows users to download history via the button next to the title history if history exists.
