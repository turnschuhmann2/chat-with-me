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
- [shadcn/ui](https://ui.shadcn.com/) with [TailwindCSS](https://tailwindcss.com/)

## TODO

### High Priority

- [x] make app usable for mobile
- [x] add basic page for editing prompts
- [x] restructure \_components, \_hooks and \_providers folders
- [x] make Chat bubbles not take up more than 60 or 70% of the total width
- [x] make loading time depend on the response length
- [ ] limit amount of prompts displayed (?)
- [ ] limit prompt container height, fix total height for phone screen
- [ ] if the response contains multiple parts (eg divided by line breaks), split them into multiple bubbles
- [ ] change title and info, change icon
- [ ] improve implementation for icons (have a look at phosphoricons)
- [ ] Add more prompts & responses
- [ ] Add responses with images
- [ ] Add image avatars using file host
- [ ] Add option to select your guest avatar
- [ ] Add a system to prompts and responses that links next prompts to previous responses, so the best prompts can be shown in the bar after a response was returned.
- [ ] Block new prompts until response was posted (?)

### Backlog

- [ ] Build the homepage
- [ ] Build the chatbot page
- [ ] Implement change avatar
- [ ] add user auth
