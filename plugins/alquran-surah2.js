import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `Contoh:\n${usedPrefix + command} 1`
   // if (isNaN(args[0]) || isNaN(args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`

    let json = await fetch(`https://api.quran.sutanlab.id/surah/${args[0]}/${args[1]}`)
        let jsons = await json.json()
        let x = jsons.data
        let caption = `*Name* : *${x.name.long}*
        
${x.name.translation.id}
${x.revelation.id}

${x.tafsir.id}
${x.verses.text[0].arab}
${x.verses.text[0].translation.id}
`
    await conn.reply(m.chat, caption, m, frep)
    await conn.sendFile(m.chat, x.verses.audio[0].primary, 'audio.mp3', '', m, 0, { mimetype: 'audio/mp4' })
    
}
handler.help = ['alquran2 <no surah> <no ayat>']
handler.tags = ['quran']
handler.command = /^(al)?quran2$/i

export default handler
