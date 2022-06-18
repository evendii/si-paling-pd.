import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!(args[0] || args[1])) throw `Contoh:\n${usedPrefix + command} 1 2\n\nMaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
    if (isNaN(args[0]) || isNaN(args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`

    let res = await fetch(`https://anabotofc.herokuapp.com/api/muslim/quran?surah=args[0]&ayat=args[1]&apikey=AnaBot`)
    let op = await res.json()
    let qt = result.data
    arb = qt.text.arab
indo = qt.translation.id
aud = qt.audio.primary
taf = qt.surah.tafsir.id
sur = qt.surah.name.long
sur2 = qt.surah.name.transliteration.id
m.reply(`${sur}\n*${sur2}*\n\n${arb}\n\n${indo}\n\n*Tafsir :*\n_${taf}_`)
    conn.sendFile(m.chat, aud, 'audio.mp3', '', m, 0, { mimetype: 'audio/mp4' })
}
handler.help = ['alquran2 <no surah> <no ayat>']
handler.tags = ['quran']
handler.command = /^(al)?quran2$/i

export default handler
