import fetch from 'node-fetch'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {

if (command == 'twittdl') {
if (!args[0]) throw `Contoh penggunaan ${usedPrefix + command} https://twitter.com/PassengersMovie/status/821025484150423557`

let f = await fetch(`https://api-xfar05.herokuapp.com/api/twitter?url=${args[0]}`)
let x = await f.json()
let caption = `*TWITTER:* ${x.result.desc}`
await conn.sendButton(m.chat, caption, wm, x.result.thumb, [
                ['Get SD', `${usedPrefix}get ${x.result.SD}`],
                ['Get HD', `${usedPrefix}get ${x.result.HD}`],
                ['Mp3', `${usedPrefix}get ${x.result.audio}`]
            ], m)
}

if (command == 'otaku') {
if (!text) throw `Contoh penggunaan ${usedPrefix + command} Naruto`

let f = await fetch(`https://yuzzu-api.herokuapp.com/api/otaku?judul=${text}`)
let p = await f.json()
let x = p.result.result
let caption = `*judul:* ${x.judul}
*japan:* ${x.japan}
*rating:* ${x.rating}
*produser:* ${x.produser}
*type:* ${x.type}
*status:* ${x.status}
*episode:* ${x.episode}
*durasi:* ${x.durasi}
*rilis:* ${x.rilis}
*studio:* ${x.studio}
*genre:* ${x.genre}
*link:* ${x.link}
*sinopsis:* ${x.sinopsis}`
await conn.sendButton(m.chat, caption, wm, x.thumb, [
                ['Next', `${usedPrefix + command} ${text}`]
            ], m)
}

if (command == 'darkjokes') {
let f = await fetch(`https://yuzzu-api.herokuapp.com/api/darkjokes`)
let c = await f.json()
let x = c.result
let caption = `Nihh banh ${command} nya`
await conn.sendHydrated(m.chat, caption, wm, x.result, null, null, null, null, [
      ['Meme', usedPrefix + 'randommeme'],
      ['Meme ID', usedPrefix + 'memeindo'],
      ['Darkjoke', usedPrefix + 'darkjoke']
    ], m)
}

if (command == 'artikbbi') {
if (!text) throw `Contoh penggunaan ${usedPrefix + command} Aku`

let f = await fetch(`https://yuzzu-api.herokuapp.com/api/kbbi?kata=${text}`)
let x = await f.json()
let caption = `Lema: ${x.result.lema}
Arti: ${Array.from(x.result.arti)}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
}

if (command == 'imgs2') {
let er = `contoh:\n\n${usedPrefix + command} hijaber

Opsi Tersedia:
• hijaber
• harley
• cecans
• anony
`
    if (!args[0]) throw er
    switch (args[0].toLowerCase()) {
        case 'hijaber':
        case 'harley':
        case 'cecans':
        case 'anony':
                let pe = await fetch(`https://mysakura.herokuapp.com/api/wallpaper/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*Nih*`, wm, x.url, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
        default:
            throw er
    }
}

if (command == 'imgs3') {
let er = `contoh:\n\n${usedPrefix + command} hijaber

Opsi Tersedia:
• waifu
• nekonime
• shinobu
• megumin
• chobay
`
    if (!args[0]) throw er
    switch (args[0].toLowerCase()) {
        case 'waifu':
        case 'nekonime':
        case 'shinobu':
        case 'megumin':
        case 'chobay':
                let pe = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*Nih*`, wm, x.url, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
        default:
            throw er
    }
}

if (command == 'imgs4') {
let er = `contoh:\n\n${usedPrefix + command} bonk

Opsi Tersedia:
• bonk
• bully
• cry
• cuddle
• dance
• hug
• lick
• pat
• slap
• smile
• smug
• yeet
`
    if (!args[0]) throw er
    switch (args[0].toLowerCase()) {
        case 'bonk':
        case 'bully':
        case 'cry':
        case 'cuddle':
        case 'dance':
        case 'hug':
        case 'lick':
        case 'pat':
        case 'slap':
        case 'smile':
        case 'smug':
        case 'yeet':
                let pe = await fetch(`https://mysakura.herokuapp.com/api/sfw/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*Nih*`, wm, x.url, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
        default:
            throw er
    }
}

if (command == 'imgs5') {
let er = `contoh:\n\n${usedPrefix + command} ahegao

Opsi Tersedia:
• ahegao
• ass
• bdsm
• blowjob
• cuckold
• cum
• ero
• femdom
• foot
• gangbang
• glasses
• hentai
• hentaigif
• jahy
• masturbation
• neko
• orgy
• panties
• pussy
• thighs
• yuri
`
    if (!args[0]) throw er
    switch (args[0].toLowerCase()) {
        case 'ahegao':
        case 'ass':
        case 'bdsm':
        case 'blowjob':
        case 'cuckold':
        case 'cum':
        case 'ero':
        case 'femdom':
        case 'foot':
        case 'gangbang':
        case 'glasses':
        case 'hentai':
        case 'hentaigif':
        case 'jahy':
        case 'masturbation':
        case 'neko':
        case 'orgy':
        case 'panties':
        case 'pussy':
        case 'thighs':
        case 'yuri':
                let pe = await fetch(`https://mysakura.herokuapp.com/api/nsfw/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*Nih*`, wm, x.result, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
        default:
            throw er
    }
}

if (command == 'mysakura') {
let er = `contoh:\n\n${usedPrefix + command} ahegao

Opsi Tersedia:
• aneh
• anime
• bijak
• bucin
• dare
• gambar
• islami
• joker
• motivasi
• pantun
• trut
`
    if (!args[0]) throw er
    switch (args[0].toLowerCase()) {
        case 'bucin':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*Bucin* ${x.result.result}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'pantun':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*pantun* ${x.result.pantun}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'dare':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*dare* ${x.result.dare}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'trut':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*trut* ${x.result.trut}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'aneh':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/truth/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*truth* ${x.result.truth}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'motivasi':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*motivasi* ${x.result.motivasi}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'anime':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/quote/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*quote* ${x.quotes}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'islami':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/quote/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*quote* ${x.result}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'bijak':
            case 'joker':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/quote/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*quote* ${x.result.quotes}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
            case 'gambar':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/quote/${args[0]}?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*quote* ${args[0]}`, wm, x.url, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            break
        default:
            throw er
    }
}

if (command == 'cewekracing') {
let pe = await fetch(`https://mysakura.herokuapp.com/api/cewek/racing?apikey=sakura404`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*Nih*`, wm, x.url, [
                ['Next', `${usedPrefix + command}`]
            ], m)
}

if (command == 'mainslot') {
let f = await fetch(`https://mysakura.herokuapp.com/api/slot?apikey=sakura404`)
let x = await f.json()
global.db.data.users[m.sender].limit += `${x.score}`
let caption = `${x.slot}

*Hasil:* ${x.hasil}
*+ Limit:* ${x.score}`
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
}

}
handler.command = handler.help = ['twittdl', 'otaku', 'darkjokes', 'artikbbi', 'cewekracing', 'imgs2', 'imgs3', 'imgs4', 'imgs5', 'mysakura', 'mainslot']
handler.tags = ['fun']

export default handler