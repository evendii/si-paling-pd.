import fetch from 'node-fetch'
let handler = async(m, { conn, usedPrefix, text, args, command }) => {

if (command == 'sfx') {
if (!text) throw `Contoh:
${usedPrefix + command} 10`
let json = await fetch(`http://www.myinstants.com/api/v1/instants/?format=json&page=${text}`)
        let jsons = await json.json()
        let caption = '*⎔┉━「 Search 」━┉⎔*\n'
        for (let x of jsons.results) {
        caption += `*Name :* ${x.name}
*Sound :* ${x.sound}
`}
        return m.reply(caption)
}

if (command == 'sfx2') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} 2`
    let gas = await fetch(`http://www.myinstants.com/api/v1/instants/?format=json&page=${args[0]}`)
    let json = await gas.json()
    let ter = json.results

    for (let i = args[1]; i < ter.length; i++) {
        let out = ter[i].sound
        await conn.sendFile(m.chat, out, 'song.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true 
})
    }
}

}
handler.command = handler.help = ['sfx', 'sfx2']
handler.tags = ['random']

export default handler
