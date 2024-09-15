## Editing the LLM to Santis model

Go to `src/pages/api/message.js` to edit the LLM. At the top you should see this:

```
const model = "Tytodd/ty2-1";
```

change model to the name of the model you want to use. In tune studio there is a get code button use that to get the model name.

Next go to `.env` and ` .env.local` and change the `TUNE_API_KEY` to your key.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
