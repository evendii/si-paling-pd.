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
let gas = await fetch(`http://www.myinstants.com/api/v1/instants/?format=json&page=${text}`)
    let json = await gas.json()

for (var i=0; i<json.results.length; i++) {
   for (var key in json.results[i]) {
       for (var j= 0; j<json.results[i][key].length; j++) {
           let ter = json.results[i][key][j]
      

let nm = 1
let nm2 = 0
for (let x of ter) {
const yy = {
title: 'Sound ke -'+ nm++,
rows: [
{title: `${ter[nm2++]}`,
 rowId: `${usedPrefix}get ${x}`}
 ]
}
let h = []
let sections = h.push(yy)

const LiM = {
  text: `⚡ Silakan pilih opsi di tombol di bawah...`,
  footer: global.wm,
  title: `⎔───「 ${command} 」───⎔`,
  buttonText: `☂️ Tema Disini ☂️`,
  sections
}
conn.sendMessage(m.chat, LiM, m)
}}
 }
   }
}

}
handler.command = handler.help = ['sfx', 'sfx2']
handler.tags = ['random']

export default handler
