import fetch from 'node-fetch'
let handler = async(m, { conn, usedPrefix, text, args, command }) => {

if (command == 'sfx') {
if (!text) throw `Contoh:
${usedPrefix + command} 10`
let json = await fetch(`http://www.myinstants.com/api/v1/instants/?format=json&page=${text}`)
        let jsons = await json.json()
        let caption = '*⎔┉━「 Search 」━┉⎔*'
        for (let x of jsons.results) {
        caption += `
        *Name :* ${x.name}
*Sound :* ${x.sound}
`}
        return m.reply(caption)
}

if (command == 'sfx2') {
if (!text) throw `Contoh:
${usedPrefix + command} 10`
let json = await fetch(`http://www.myinstants.com/api/v1/instants/?format=json&page=${text}`)

    for (let i = 0; i < json.results; i++) {
        let out = ter[i].sound
sections = []
nm = 1
nm2 = 0
for (let x of out) {
const yy = {title: 'Urutan ke -'+ nm++,
rows: [
{
title: `${lm[nm2++]}`,
description: ``,
rowId: `${x}`
}
]
}
sections.push(yy)
const listMessage = {
  text: "Pilih Dibawah",
  footer: wm,
  title: "O P T I O N",
  buttonText: "Klik disini",
  sections
}
await conn.sendMessage(m.chat, listMessage, m)
}
}
}

}
handler.command = handler.help = ['sfx', 'sfx2']
handler.tags = ['random']

export default handler
