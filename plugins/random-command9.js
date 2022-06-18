import fetch from 'node-fetch'
import fs from 'fs'

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

}
handler.command = handler.help = ['urlscan', 'fotoduck', 'fotobear', 'fotodog', 'fotodog2', 'fotofox', 'fotoshibe']
handler.tags = ['random']

export default handler