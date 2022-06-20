import fetch from 'node-fetch'
let handler = async(m, { conn, usedPrefix, text, args, command }) => {

if (command == 'sfx2') {
if (!text) throw `Contoh:
${usedPrefix + command} 10`
let json = await fetch(`http://www.myinstants.com/api/v1/instants/?format=json&page=${text}`)
        let jsons = await json.json()
        let caption = '\n\n*⎔┉━「 Search 」━┉⎔*\n\n'
        for (let x of jsons.results) {
        caption += `*Name :* ${x.name}
*Sound :* ${x.sound}
`}
        return m.reply(caption)
}

if (command == 'sfx') {
if (!args[0] || !args[1]) throw `Contoh penggunaan ${usedPrefix}${command} 2 9
*ket:*
2 : page site
9 : urutan sound

_Batas urutan 10_`
    let gas = await fetch(`http://www.myinstants.com/api/v1/instants/?format=json&page=${args[0]}`)
    let json = await gas.json()
    let hasil = json.results
    let ke = args[1]
    let sound = hasil[ke].sound
    await conn.sendFile(m.chat, sound, 'song.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true 
})
}

}
handler.command = handler.help = ['sfx', 'sfx2']
handler.tags = ['random']

export default handler
