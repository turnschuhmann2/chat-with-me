# Chat With Me - An interactive Portfolio

Searching for a creative and unique idea for my portfolio, I came up with this. [ChatWithMe](https://chat-with-me-cyan.vercel.app/) is a web app where the user can chat with a chat bot. The "main" chat bot will be representing me. By chatting, you can get to know me. Future plans include functionality for the user to build their own chat bots and being able to share them with others.

## How to install

1. Run `pnpm install`to install all packages.
2. Create a `.env` file and paste in required environment variables (see [.env.example](.env.example))
3. Start the application using `pnpm run dev` or `pnpm run dev --turbo` if you want to use [Turbopack](https://turbo.build/pack). Note that this wont work with debugging in vscode.

## TODO

### High Priority

- [x] make app usable for mobile
- [x] add basic page for editing prompts
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
