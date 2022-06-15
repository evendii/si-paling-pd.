import fetch from 'node-fetch'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {
if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    if (chat.antiBokep) {
if (command == 'caribokep') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} japan`
  let json = await fetch(`https://bx-hunter.herokuapp.com/api/xvideosearch?query=${text}&apikey=FuckBitch`)
  let jsons = await json.json()
        let caption = `*⎔┉━「 ${command} 」━┉⎔*`
        for (let x of jsons.result) {
        caption += `
Judul *${x.title}*
Info: ${x.info}
Link: ${x.link}
`}
        return m.reply(caption)
    }
    if (command == 'caribokep1') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} japan`
  let json = await fetch(`https://bx-hunter.herokuapp.com/api/pornhubscraper?query=${text}&apikey=FuckBitch`)
  let jsons = await json.json()
        let caption = `*⎔┉━「 ${command} 」━┉⎔*`
        for (let x of jsons.result) {
        caption += `
Judul *${x.title}*
views: ${x.views}
author: ${x.author}
link: ${x.link}
`}
        return m.reply(caption)
    }
    if (command == 'dlbokep') {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} link Xvideos`
  let json = await fetch(`https://bx-hunter.herokuapp.com/api/xvideodetail?url=${text}&apikey=FuckBitch`)
  let jsons = await json.json()
  let x = jsons.result
conn.sendFile(m.chat, x.files.high, 'asupan.mp4', x.title, m)
}
        } else if (!chat.antiBokep) {
    await conn.sendButton(m.chat, `*Bokep detect*`, author, ['off bokep', '/disable bokep'], m)
    }
}
handler.command = handler.help = ['caribokep', 'caribokep1', 'dlbokep']
handler.tags = ['nsfw']

export default handler
