import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions/index.js'
import { NewMessage } from 'telegram/events/index.js'
import { getMediaName, saveBufferToFile } from './utils.mjs'
import { apiId, apiHash, session } from './config.mjs'

const SESSION = new StringSession(session)
const client = new TelegramClient(SESSION, apiId, apiHash, {
  connectionRetries: 2
})

await client.connect()

console.log('Client connected')

client.addEventHandler(async event => {
  if (event.message.media) {
    const sender = await event.message.getSender()
    const chat = await event.message.getChat()

    const fileName = getMediaName(event.message, {
      senderId: String(sender.id.value),
      date: event.message.date,
      id: event.message.id,
      chatId: String(chat.id.value)
    })

    const buffer = await client.downloadMedia(event.message)

    saveBufferToFile(buffer, fileName)
  }
}, new NewMessage({}))
