import fs from 'fs'
import path from 'path'
import mimeDB from 'mime-db'
import { downloadPath } from './config.mjs'

export const getMediaName = (message, { senderId, id, date, chatId }) => {
  const fileName = `${senderId}_${chatId}_${id}_${date}`
  if (message.media.document) {
    const docAttributes = message?.media?.document?.attributes

    if (docAttributes) {
      let ext
      const fileNameObj = docAttributes.find(e => e.className === 'DocumentAttributeFilename')
      if (fileNameObj) {
        ext = fileNameObj.fileName.split('.').pop()
      } else {
        ext = mimeDB[message.media.document.mimeType]?.extensions[0]
      }
      return `${fileName}.${ext}`
    }
  }

  if (message.media.video) {
    return fileName + '.mp4'
  }
  if (message.media.audio) {
    return fileName + '.mp3'
  }
  if (message.media.photo) {
    return fileName + '.jpg'
  }

  return fileName
}

export function getCurrentDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function saveBufferToFile(buffer, filename) {
  const ext = path.extname(filename).slice(1)
  const currentDate = getCurrentDate()
  const saveDir = path.join(downloadPath, currentDate, ext)
  const savePath = path.join(saveDir, filename)

  fs.mkdir(saveDir, { recursive: true }, err => {
    if (err) {
      console.error(`Error creating directory ${saveDir}`, err)
      return
    }

    fs.writeFile(savePath, buffer, err => {
      if (err) {
        console.error(`Error writing file ${savePath}`, err)
      } else {
        console.log(`File saved to ${savePath}`)
      }
    })
  })
}
