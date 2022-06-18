import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!(args[0] || args[1])) throw `Contoh:\n${usedPrefix + command} 1 2\n\nMaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
    if (isNaN(args[0]) || isNaN(args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`

    let res = await fetch(`https://anabotofc.herokuapp.com/api/muslim/quran?surah=args[0]&ayat=args[1]&apikey=AnaBot`)
    let qt = await res.json()
    arb = qt.result.text.arab
indo = qt.result.translation.id
aud = qt.result.audio.primary
taf = qt.result.surah.tafsir.id
sur = qt.result.surah.name.long
sur2 = qt.result.surah.name.transliteration.id
m.reply(`${sur}\n*${sur2}*\n\n${arb}\n\n${indo}\n\n*Tafsir :*\n_${taf}_`)
    conn.sendFile(m.chat, aud, 'audio.mp3', '', m, 0, { mimetype: 'audio/mp4' })
}
handler.help = ['alquran2 <no surah> <no ayat>']
handler.tags = ['quran']
handler.command = /^(al)?quran2$/i

export default handler
