import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

import ameClient from 'amethyste-api'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, command }) => {
let frep = { contextInfo: { externalAdReply: {title: global.wm, body: global.author, sourceUrl: snh, thumbnail: fs.readFileSync('./thumbnail.jpg')}}}
let fdoc = {quoted:{key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `${command}`}}}}

if (command == 'urlscan') {
if (!text) throw `Masukkan link`
let res = await fetch(`https://urlscan.io/api/v1/search/?q=${text}`)
  let sul = await res.json()
  let xx = sul.results
  await conn.sendButton(m.chat, `*Quotes:*
  ${xx[0].task.visibility}
  ${xx[0].task.method}
  ${xx[0].task.domain}
  ${xx[0].task.time}
  ${xx[0].task.uuid}
  ${xx[0].task.url}
  
  ${xx[0].stats.uniqIPs}
  ${xx[0].stats.uniqCountries}
  ${xx[0].stats.dataLength}
  ${xx[0].stats.encodedDataLength}
  
  ${xx[0].page.country}
  ${xx[0].page.ip}
  ${xx[0].page.title}
  ${xx[0].page.url}
  
  ${xx[0].result}
  `, wm, xx[0].screenshot, [
                ['Menu', `${usedPrefix}menu`]
            ], m, fdoc)
}

if (command == 'fotoduck') {
  let res = await fetch(`https://random-d.uk/api/random`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Duck:*
  ${x.message}`, wm, x.url, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'fotobear') {
if (!(args[0] || args[1])) throw `Contoh:\n${usedPrefix + command} 600 600`
  let res = await fetch(`https://placebear.com/${args[0]}/${args[1]}`)
  await conn.sendButton(m.chat, `*Bear:*
  ${args[0]}`, wm, res, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'fotodog') {
if (!(args[0] || args[1])) throw `Contoh:\n${usedPrefix + command} 600 600`
  let res = await fetch(`https://place.dog/${args[0]}/${args[1]}`)
  await conn.sendButton(m.chat, `*Dog:*
  ${args[0]}`, wm, res, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'fotodog2') {
  let res = await fetch(`https://random.dog/woof.json`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Dog:*
  ${args[0]}`, wm, x.url, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'fotofox') {
  let res = await fetch(`https://randomfox.ca/floof/`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Fox:*
  ${x.link}`, wm, x.image, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'fotoshibe') {
  let res = await fetch(`https://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Shibe:*
  ${args[0]}`, wm, x.getRandom(), [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'amet') {
let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Fotonya Mana?'
    if (!args[0]) return m.reply(`Balas gambar dengan perintah
    ${usedPrefix + command} effect
*List effect:*
pixelize
posterize
blur
Nom
circle
rejected
approved
glitch
distort
sepia
contrast
greyscale
invert
pixelize
blur
posterize
beautiful
afusion
wanted
3000years
rip
utatoo
wasted
frame
moustache
scary`)
    
    let img = await q.download?.()
    let url = await uploadImage(img)
    let ameApi = new ameClient("690b646e9a28fb7737e373814e1c0731d3b01c8cf6ce42912013130a7dd8800128d965bb703a00212b3e6e3864682c544cf73024288ae6a9b459ab8e386503bf")
    await ameApi.generate(`${args[0]}`, {
	    "url" : `${url}`
    }).then(image => {
      await conn.sendButton(m.chat, `*Image:*`, wm, image, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
    }).catch(err => {
      throw err;
    })
}

if (command == 'amet2') {
let ameApi = new ameClient("690b646e9a28fb7737e373814e1c0731d3b01c8cf6ce42912013130a7dd8800128d965bb703a00212b3e6e3864682c544cf73024288ae6a9b459ab8e386503bf")
await ameApi.image("wallpaper", {
    "nsfw" : "true"
}).then(image => {
    await conn.sendButton(m.chat, `*Image:*`, wm, image.url, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}).catch(err => {
    throw err;
});
}

}
handler.command = handler.help = ['urlscan', 'fotoduck', 'fotobear', 'fotodog', 'fotodog2', 'fotofox', 'fotoshibe', 'amet', 'amet2']
handler.tags = ['random']

export default handler