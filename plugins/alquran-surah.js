import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, { conn, args, usedPrefix, command }) => {
let frep = { contextInfo: { externalAdReply: {title: global.wm, body: global.author, sourceUrl: snh, thumbnail: fs.readFileSync('./thumbnail.jpg')}}}

    if (!(args[0] || args[1])) throw `Contoh:\n${usedPrefix + command} 1 2\n\nMaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
   // if (isNaN(args[0]) || isNaN(args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`

    let json = await fetch(`https://api.quran.sutanlab.id/surah/${args[0]}/${args[1]}`)
        let jsons = await json.json()
        let x = jsons.data[0]
        let caption = `*Name* : *${x.text.arab}*
Id : ${x.translation.id}
${x.surah.name.long}
${x.surah.name.transliteration.id}

${x.tafsir.id.long}
`
    await conn.reply(m.chat, caption, m, frep)
    await conn.sendFile(m.chat, x.audio.primary, 'audio.mp3', '', m, 0, { mimetype: 'audio/mp4' })
    
}
handler.help = ['alquran <no surah> <no ayat>']
handler.tags = ['quran']
handler.command = /^(al)?quran$/i

export default handler
