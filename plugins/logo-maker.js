import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, command }) => {
let fdoc = {quoted:{key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `${command}`}}}}

if (command == 'trengif') {
        let url = `https://api.giphy.com/v1/gifs/trending?api_key=SdX60eTdyvdo0aAyJMQ5u87Qh7mTz7bG`
    await fetch(url)
    .then(response => response.json())
    .then(content => {
        let img = content.data[0].images.original.url
        let title = content.data[0].title
    });
    
  let caption = `*⎔┉━「 ${command} 」━┉⎔*
🤠 *Query* : ${title}`
  await conn.sendButton(m.chat, caption, wm, img, [
                ['Next', `${usedPrefix + command}`],
                ['Menu', `${usedPrefix}menu`]
            ], m, fdoc)
}

if (command == 'trengif') {
if (!text) throw `Masukkan teks`
        let url = `http://api.giphy.com/v1/gifs/search?q=${text}&api_key=SdX60eTdyvdo0aAyJMQ5u87Qh7mTz7bG`
    await fetch(url)
    .then(response => response.json())
    .then(content => {
        let img = content.data[0].images.original.url
        let title = content.data[0].title
    });
    
  let caption = `*⎔┉━「 ${command} 」━┉⎔*
🤠 *Query* : ${title}`
  await conn.sendButton(m.chat, caption, wm, img, [
                ['Next', `${usedPrefix + command}`],
                ['Menu', `${usedPrefix}menu`]
            ], m, fdoc)
}

}
handler.command = handler.help = ['trengif', 'searchgif']
handler.tags = ['maker']
export default handler