import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
import fs from "fs"

let handler = async(m, { conn, usedPrefix, text, args, command }) => {

if (command == 'exchange') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} IDR USD 50000`

let f = await fetch(`https://v6.exchangerate-api.com/v6/0dd0737285141eb9fa078319/pair/${args[0]}/${args[1]}/${args[2]}`)
let x = await f.json()
let caption = `🤠 *Name:* ${x.name}
*Last Up:* ${x.time_last_update_utc}
*Next Up:* ${x.time_next_update_utc}
*Dari:* ${x.base_code}
*Ke:* ${x.target_code}

*Rate:* ${x.conversion_rate}
*Result:* ${x.conversion_result}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix}${command} ${text}`]
            ], m)
}

if (command == 'ipcountry') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} 8.8.8.8`

let f = await fetch(`https://api.country.is/${args[0]}`)
let x = await f.json()
let caption = `🤠 ${x.country}
*Ip:* ${x.ip}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix}${command} ${text}`]
            ], m)
}

if (command == 'likee') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://likee.video/@vicky_marpaung/video/7006676628722311449`

let f = await fetch(`https://tyz-api.herokuapp.com/downloader/likeedl?link=${args[0]}`)
let x = await f.json()
let caption = `🤠 ${x.title}
🤠 ${x.url}
🤠 ${x.duration}
🤠 ${x.source}

🤠 ${x.medias[0].quality}
🤠 ${x.medias[0].extension}
🤠 ${x.medias[0].formattedSize}
`
await conn.sendButton(m.chat, caption, wm, x.thumbnail, [
                ['Get', `${usedPrefix}get ${x.medias[0].url}`]
            ], m)
}

if (command == 'sfiledl') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} http://www.solidfiles.com/v/zdpVXjvRk8yaV`

let f = await fetch(`https://tyz-api.herokuapp.com/downloader/sfiledl?link=${args[0]}`)
let x = await f.json()
let caption = `🤠 ${x.title}
🤠 ${x.url}
🤠 ${x.size}
`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Get', `${usedPrefix}get ${x.url}`]
            ], m)
}

if (command == 'mediafiredl') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://www.mediafire.com/file/pwxob70rpgma9lz/GBWhatsApp_v8.75%2528Tutorial_Yud%2529.apk/file`

let f = await fetch(`https://tyz-api.herokuapp.com/downloader/mediafireDl?link=${args[0]}`)
let x = await f.json()
let caption = `🤠 ${x.title}
🤠 ${x.link}
🤠 ${x.size}
`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Get', `${usedPrefix}get ${x.link}`]
            ], m)
}

if (command == 'scdl') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://soundcloud.com/user-943750457/jang-ganggu-shine-of-black`

let f = await fetch(`https://tyz-api.herokuapp.com/downloader/scdl?link=${args[0]}`)
let x = await f.json()
let caption = `🤠 ${x.title}
🤠 ${x.link}
`
await conn.sendButton(m.chat, caption, wm, x.thumb, [
                ['Get', `${usedPrefix}get ${x.link}`]
            ], m)
}

if (command == 'alphacoders') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} genshin`

let f = `https://tyz-api.herokuapp.com/search/alphacoders?query=${text}`
let caption = `Hasil
🤠 ${text}
`
await conn.sendButton(m.chat, caption, wm, f, [
                ['Next', `${usedPrefix + command} ${text}`]
            ], m)
}

if (command == 'emojimix3') {
if (!args[0]) throw `Ex: ${usedPrefix+command} ${decodeURI('%F0%9F%92%80')}`
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(args[0])}`)
for (let res of anu.results) {
let stiker = await sticker(false, res.url, global.packname, global.author)
conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
}
}


}
handler.command = handler.help = ['exchange', 'ipcountry', 'likee', 'sfiledl', 'scdl', 'mediafiredl', 'alphacoders', 'emojimix3']
handler.tags = ['tools']

export default handler

const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options)
.then(response => response.json())
.then(json => {
resolve(json)
})
.catch((err) => {
reject(err)
})})
