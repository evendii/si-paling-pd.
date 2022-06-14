import fetch from 'node-fetch'
import quotes from '../lib/jagokata'
import kbbi from '../lib/kbbi'
import sholatAll from '../lib/salat'
import axios from 'axios'
import cheerio from 'cheerio'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {

if (command == 'platgames') {
let json = await fetch(`https://www.freetogame.com/api/games?platform=${text}`)
        let jsons = await json.json()
        let caption = `*⎔┉━「 ${command} 」━┉⎔*`
        for (let x of jsons) {
        caption += `
🤠 *Name* : *${x.title}*
Link : ${x.game_url}
Genre : ${x.genre}
Platform : ${x.platform}
Rilis : ${x.release_date}
Developer : ${x.developer}
Desc : ${x.short_description}
`}
await conn.sendButton(m.chat, caption, wm, x.thumbnail, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            }
            
if (command == 'kataquotes') {
let pe = await fetch(`https://programming-quotes-api.herokuapp.com/Quotes/random`)
let xc = await pe.json()
let x = xc.result
  await conn.sendButton(m.chat, `*Quote:*
${x.en}

*Author:*
${x.author}`, wm, null, [
                ['Next', `${usedPrefix + command}`],
                ['Translate', `${usedPrefix}tr id ${x.en}`]
            ], m)
            }
            
if (command == 'listgames') {
let json = await fetch(`https://www.freetogame.com/api/games`)
        let jsons = await json.json()
        let caption = `*⎔┉━「 ${command} 」━┉⎔*`
        for (let x of jsons) {
        caption += `
🤠 *Name* : *${x.title}*
Link : ${x.game_url}
Genre : ${x.genre}
Platform : ${x.platform}
Rilis : ${x.release_date}
Developer : ${x.developer}
Desc : ${x.short_description}
`}
await conn.sendButton(m.chat, caption, wm, x.thumbnail, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            }
            
if (command == 'carigames') {
let json = await fetch(`https://www.freetogame.com/api/games?category=${text}`)
        let jsons = await json.json()
        let caption = `*⎔┉━「 ${command} 」━┉⎔*`
        for (let x of jsons) {
        caption += `
🤠 *Name* : *${x.title}*
Link : ${x.game_url}
Genre : ${x.genre}
Platform : ${x.platform}
Rilis : ${x.release_date}
Developer : ${x.developer}
Desc : ${x.short_description}
`}
await conn.sendButton(m.chat, caption, wm, x.thumbnail, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            }
            
if (command == 'anyjoke') {
let json = await fetch(`https://v2.jokeapi.dev/joke/Any`)
        let jsons = await json.json()
        let caption = `*⎔┉━「 ${command} 」━┉⎔*`
        for (let x of jsons) {
        caption += `
        🤠 *Category* : *${x.category}*
Quoted : ${x.setup}
Type : ${x.type}
Delivery : ${x.delivery}
Platform : ${x.safe}
Rilis : ${x.id}
Lang : ${x.lalontong}
`}
await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}anyjoke ${x.setup}`]
            ], m)
            }
            
if (command == 'giveaways') {
let pe = await fetch(`https://www.gamerpower.com/api/giveaways`)
let jsons = await pe.json()
let caption = `*⎔┉━「 ${command} 」━┉⎔*`
        for (let x of jsons) {
        caption += `*Quote:* ${x.title}
*Worth:* ${x.worth}
*Desc:* ${x.description}
*Step:* ${x.instructions}`}
  await conn.sendButton(m.chat, caption, wm, x.image, [
                ['Next', `${usedPrefix + command}`],
                ['Translate', `${usedPrefix}tr id ${x.description}`]
            ], m)
            }
            
if (command == 'kata') {
let er = `contoh:\n\n${usedPrefix + command} cinta

Opsi Tersedia:
• cinta
• rindu
• mimpi
• sendiri
• sabar
• kesedihan
• pernikahan
• kemerdekaan
`
    if (!args[0]) throw er
    switch (args[0].toLowerCase()) {
        case 'cinta':
        case 'rindu':
        case 'mimpi':
        case 'sendiri':
        case 'sabar':
        case 'kesedihan':
        case 'pernikahan':
        case 'kemerdekaan':
            quotes(args[0].toLowerCase()).then(res => {
                let data = JSON.stringify(res)
                let json = JSON.parse(data)
                let random = Math.floor(Math.random() * json.data.length)
                let hasil = json.data[random]
                let { author, bio, quote } = hasil
                let caption = `_“${quote}”_\n\n_${author}_`
                await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            })
            break
        default:
            throw er
    }
}

if (command == 'kbbi') {
if (!text) throw 'Contoh penggunaan\n#kbbi hai'
  kbbi(text).then(res => {
  let kbbi = JSON.stringify(res)
  let jjson = JSON.parse(kbbi)
  let json = jjson
  let caption = `${json.lema}\n\n${json.arti.join(', ')}`.trim()
  await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
  })
}

if (command == 'salat2') {
if (!text) throw `uhm.. kota apa?\n\n${usedPrefix + command} jakarta pusat`
    let lcity = await city().then(res => { return res })
    let c = text.replace(' ', '-').toUpperCase()
    if (!lcity.includes(c)) return m.reply('kota tidak ditemukan!' + readMore + '\n\n' + lcity.map((v, i) => `${i + 1}. ${v}`).join`\n`)
    let json = await sholatAll(text).then(async res => {
        let data = JSON.stringify(res)
        let json = JSON.parse(data)
        return json
    })
    m.reply(`
┌「 ${c} 」
├ tanggal: ${json.data.tanggal}
├ ${json.data.subuh} : Subuh
├ ${json.data.duha} : Dhuha
├ ${json.data.zuhur} : Dzuhur
├ ${json.data.ashar} : Ashar
├ ${json.data.magrib} : Mahgrib
├ ${json.data.isya} : Isya
└──────────`.trim())
}
            
            
}
handler.command = handler.help = ['platgames', 'kataquotes', 'listgames', 'carigames', 'anyjoke', 'giveaways', 'kata', 'kbbi', 'salat2']
handler.tags = ['quotes']

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function city() {
    return new Promise(async (resolve, reject) => {
        let html = await (await axios.get('https://m.dream.co.id/jadwal-salat/ambon/')).data
        $ = cheerio.load(html)
        let collect = []
        $('select > option').each(function (i, e) {
            data = $($(e)).text()
            collect.push(data)
        })
        resolve(collect)
    })
}
