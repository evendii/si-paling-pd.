import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
import fs from "fs"

let handler = async(m, { conn, usedPrefix, text, args, command }) => {

let frep = `{ contextInfo: { externalAdReply: {title: global.wm, body: global.author, sourceUrl: snh, thumbnail: fs.readFileSync('./thumbnail.jpg')  }}}`
let urut = text.split`|`
  let one = urut[1]
  let two = urut[2]
  let three = urut[3]
  
let er = `contoh:\n\n${usedPrefix + command} ecchi

Opsi Tersedia:
• attp
• nulis
• nulis2
• ttp
• chord
• hentai4everyone
• animearmpits
• animefeets
• animethighss
• animebooty
• biganimetiddies
• animebellybutton
• sideoppai
• ahegao
`
    if (!args[0]) throw er
    switch (args[0].toLowerCase()) {
        case 'attp':
                let pe = `https://hadi-api.herokuapp.com/api/canvas/${one}?text=${two}`
                let stiker = await sticker(null, global.API(pe), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
            break
            case 'ttp':
                let pe = `https://hadi-api.herokuapp.com/api/canvas/${one}?text=${two}`
                let stiker = await sticker(null, global.API(pe), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
            break
            case 'nulis':
                let pe = `https://hadi-api.herokuapp.com/api/canvas/${one}?text=${two}`
    conn.sendFile(m.chat, pe, 'hasil.jpg', '', m)
            break
            case 'nulis2':
                let pe = `https://hadi-api.herokuapp.com/api/canvas/${one}?text=${two}`
    conn.sendFile(m.chat, pe, 'hasil.jpg', '', m)
            break
            case 'chord':
if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sayang`
let f = await fetch(`https://hadi-api.herokuapp.com/api/chord?q=${one}`)
let x = await f.json()
let caption = `*Result:*\n ${x.result}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'corohelp':
if (!one) throw `Contoh penggunaan ${usedPrefix}${command} indonesia`
let f = await fetch(`https://hadi-api.herokuapp.com/api/corohelp?negara=${one}`)
let o = await f.json()
let x = o.result
let caption = `*terkonfirmasi:* ${x.terkonfirmasi}
*meniggal:* ${x.meniggal}
*sembuh:* ${x.sembuh}
*update:* ${x.update}
`
await conn.reply(m.chat, caption, m, frep)
            break
            case 'cuaca':
if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sulswesi selatan`
let f = await fetch(`https://hadi-api.herokuapp.com/api/cuaca?prov=${one}`)
let o = await f.json()
let x = o.result
let caption = `*terkonfirmasi:* ${Array.from(x)}`
await conn.reply(m.chat, caption, m, frep)
            break
            case 'cuttly':
if (!one) throw `Contoh penggunaan ${usedPrefix}${command} https://google.com`
let f = await fetch(`https://hadi-api.herokuapp.com/api/cuttly?url=${one}`)
let x = await f.json()
let caption = `*Result:*\n ${x.result}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'darkjokes':
let f = await fetch(`https://hadi-api.herokuapp.com/api/darkjokes`)
let x = await f.json()
let caption = `*Result:*\n ${command}`
await conn.sendButton(m.chat, caption, wm, x.result, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'detik':
let f = await fetch(`https://hadi-api.herokuapp.com/api/detik`)
let o = await f.json()
let p = o.result
let x = p.getRandom()
let caption = `*Result:* ${x.title}
Result:* ${x.link_url}`
await conn.sendButton(m.chat, caption, x.Time, x.img_url, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'font':
if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sayang`
let f = await fetch(`https://hadi-api.herokuapp.com/api/font?teks=${one}`)
let x = await f.json()
let caption = `*Result:*\n ${x.result}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'font2':
if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sayang`
let f = await fetch(`https://hadi-api.herokuapp.com/api/font2?teks=${one}`)
let x = await f.json()
let caption = `*Result:*\n ${x.result}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'githubstalk':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sayang`
let f = await fetch(`https://hadi-api.herokuapp.com/api/githubstalk?username=${one}`)
let o = await f.json()
let x = o.result
let caption = `*Bio:* ${x.bio}
*company:* ${x.company}
*email:* ${x.email}
*t-user:* ${x.twiter_username}
*p-repo:* ${x.public_repo}
*p-gists:* ${x.public_gists}
*follower:* ${x.follower}
*following:* ${x.following}
*location:* ${x.location}
`
await conn.sendButton(m.chat, caption, wm, x.avatar, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            
        default:
            throw er
    }

}
handler.command = handler.help = ['hadi']
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
