import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
import fs from "fs"

let handler = async(m, { conn, usedPrefix, text, args, command }) => {
let frep = { contextInfo: { externalAdReply: {title: global.wm, body: global.author, sourceUrl: snh, thumbnail: fs.readFileSync('./thumbnail.jpg')}}}
let fdoc = {quoted:{key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `${command}`}}}}

if (command == 'twittdl') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix + command} https://twitter.com/PassengersMovie/status/821025484150423557`

let f = await fetch(`https://api-xfar05.herokuapp.com/api/twitter?url=${args[0]}`)
let x = await f.json()
let caption = `*TWITTER:* ${x.result.desc}`
await conn.sendButton(m.chat, caption, wm, x.result.thumb, [
                ['Get SD', `${usedPrefix}get ${x.result.SD}`],
                ['Get HD', `${usedPrefix}get ${x.result.HD}`],
                ['Mp3', `${usedPrefix}get ${x.result.audio}`]
            ], m, fdoc)
}

if (command == 'otaku') {
if (!text) throw `Contoh penggunaan ${usedPrefix + command} Naruto`

let f = await fetch(`https://yuzzu-api.herokuapp.com/api/otaku?judul=${text}`)
let p = await f.json()
let x = p.result.result
let caption = `*judul:* ${x.judul}
*japan:* ${x.japan}
*rating:* ${x.rating}
*produser:* ${x.produser}
*type:* ${x.type}
*status:* ${x.status}
*episode:* ${x.episode}
*durasi:* ${x.durasi}
*rilis:* ${x.rilis}
*studio:* ${x.studio}
*genre:* ${x.genre}
*link:* ${x.link}
*sinopsis:* ${x.sinopsis}`
await conn.sendButton(m.chat, caption, wm, x.thumb, [
                ['Next', `${usedPrefix + command} ${text}`]
            ], m, fdoc)
}

if (command == 'darkjokes') {
let f = await fetch(`https://yuzzu-api.herokuapp.com/api/darkjokes`)
let c = await f.json()
let x = c.result
let caption = `Nihh banh ${command} nya`
await conn.sendHydrated(m.chat, caption, wm, x.result, null, null, null, null, [
      ['Meme', usedPrefix + 'randommeme'],
      ['Meme ID', usedPrefix + 'memeindo'],
      ['Darkjoke', usedPrefix + 'darkjoke']
    ], m, fdoc)
}

if (command == 'artikbbi') {
if (!text) throw `Contoh penggunaan ${usedPrefix + command} Aku`

let f = await fetch(`https://yuzzu-api.herokuapp.com/api/kbbi?kata=${text}`)
let x = await f.json()
let caption = `Lema: ${x.result.lema}
Arti: ${Array.from(x.result.arti)}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'cewekracing') {
let pe = await fetch(`https://mysakura.herokuapp.com/api/cewek/racing?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*Nih*`, wm, x.url, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'mainslot') {
let f = await fetch(`https://mysakura.herokuapp.com/api/slot?apikey=sakura404`)
let x = await f.json()
let caption = `${x.slot}

*Hasil:* ${x.hasil}
*+ poin:* ${x.score}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

}
handler.command = handler.help = ['twittdl', 'otaku', 'darkjokes', 'artikbbi', 'cewekracing', 'mainslot']
handler.tags = ['tools']

export default handler