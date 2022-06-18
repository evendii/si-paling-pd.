import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!(args[0] || args[1])) throw `Contoh:\n${usedPrefix + command} 1 2\n\nMaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
    if (isNaN(args[0]) || isNaN(args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`

    let json = await fetch(`https://api.lolhuman.xyz/api/quran/args[0]/args[1]?apikey=9b817532fadff8fc7cb86862`)
        let jsons = await json.json()
        let caption = `*⎔┉━「 ${command} 」━┉⎔*\n`
        for (let x of json.result.ayat) {
        caption += `
${json.result.asma}
${json.result.surah}
${json.result.jumlah_ayat}
${json.result.type}

${x.ayat}
${x.arab}
${x.indonesia}
${x.latin}
( Q.S ${json.result.surah} : ${json.result.nomor} )
`}
        await conn.reply(m.chat, caption, m, frep)
    conn.sendFile(m.chat, json.result.audio, 'audio.mp3', '', m, 0, { mimetype: 'audio/mp4' })
}
handler.help = ['alquran <no surah> <no ayat>']
handler.tags = ['quran']
handler.command = /^(al)?quran$/i

export default handler
