# Node Telegram media downloader

Automatically download all media from your chats, including channels, groups, and private chats, excluding secret chats.

## How to use

1. Install dependencies

```
pnpm i
```

2. Open `config.mjs` and fill in your parameters: `apiHash`, `apiId`, `session`, `downloadPath`.
3. Run

```
node index.mjs
```
Media will be downloaded in `${downloadPath}/${YYYY-MM-DD}/${fileExtension}` folder.