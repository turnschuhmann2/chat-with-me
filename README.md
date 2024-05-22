# Chat With Me - An Interactive Portfolio

Searching for a creative and unique idea for my portfolio, I came up with this! [ChatWithMe](https://chat-with-me-cyan.vercel.app/) is a web app where the user can chat with a chat bot. The "main" chat bot will be representing me. By chatting, you can get to know me. Future plans include functionality for the user to build their own chat bots and being able to share them with others.

## How to install

1. Run `pnpm install`to install all packages.
2. Create a `.env` file and paste in required environment variables (see [.env.example](.env.example))
3. Start the application using `pnpm run dev` or `pnpm run dev --turbo` if you want to use [Turbopack](https://turbo.build/pack). Note that this wont work with debugging in vscode.

## Useful commands

- use `pnpm db:push` to push changes to the database schema
- use `pnpm db:studio` to open Drizzle Studio

## Features

- [Next.js](https://nextjs.org/) with new App Router
- React Server Components (RSCs) and Server Actions
- [Framer Motion](https://www.framer.com/motion/) for animation of the chat page
- [Drizzle ORM](https://orm.drizzle.team/) (with Postgres) for storing data
- [TailwindCSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for ui components
- [Phosphor Icons](https://phosphoricons.com/) for icon components

## TODO

### High Priority

- [x] add authentication using clerk
- [x] implement basic navbar
- [x] implement guest avatar
- [x] implement chatbot collection in drizzle
- [x] implement chatbot overview page skeleton
- [x] add data fetch to chatbot overview page
- [x] add filters for each chatbot page tab
- [ ] add share, favour and other options functionality to chatbot card
- [ ] implement create and edit chatbot
- [ ] add functionality to chatbot switch (add "currentChatbot" field to clerk user metadata)
- [ ] change chat bubble colors to avatar backgroundTransparent color

### Backlog

- Implement UI for mobile
- Add a system to prompts and responses that links next prompts to previous responses, so the best prompts can be shown in the bar after a response was returned.
- if the response contains multiple parts (eg divided by line breaks), split them into multiple bubbles (?)
- Build the homepage, add redirect to /home
- Add responses with images
