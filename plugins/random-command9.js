import fetch from 'node-fetch'
import fs from 'fs'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, command }) => {
let frep = { contextInfo: { externalAdReply: {title: global.wm, body: global.author, sourceUrl: snh, thumbnail: fs.readFileSync('./thumbnail.jpg')}}}
let fdoc = {quoted:{key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `${command}`}}}}
let imgr = flaaa.getRandom()

if (command == 'urlscan') {
if (!text) throw `Masukkan link`
let json = await fetch(`https://urlscan.io/api/v1/search/?q=${text}`)
        let jsons = await json.json()
        let caption = `*⎔┉━「 ${command} 」━┉⎔*\n`
        for (let x of jsons.results) {
        caption += `*Result:*\n
*visibility:* ${x.task.visibility}
*method:* ${x.task.method}
*domain:* ${x.task.domain}
*time:* ${x.task.time}
*uuid:* ${x.task.uuid}
*url:* ${x.task.url}
*uniqIPs:* ${x.stats.uniqIPs}
*uniqCountries:* ${x.stats.uniqCountries}
*dataLength:* ${x.stats.dataLength}
*encodedDataLength:* ${x.stats.encodedDataLength}
*country:* ${x.page.country}
*ip:* ${x.page.ip}
*url:* ${x.page.url}
*result:* ${x.result}
  `}
        await conn.reply(m.chat, caption, m, frep)
}

if (command == 'fotoduck') {
  let res = await fetch(`https://random-d.uk/api/random`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Duck:*
  ${x.message}`, wm, x.url, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'fotobear') {
if (!args[0]) throw `Contoh:\n${usedPrefix + command} 600 600`
if (!args[1]) throw `Contoh:\n${usedPrefix + command} 600 600`
  let res = `https://placebear.com/${args[0]}/${args[1]}`
  await conn.sendButton(m.chat, `*Bear:*
  ${args[0]}`, wm, res, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'fotodog') {
if (!args[0]) throw `Contoh:\n${usedPrefix + command} 600 600`
if (!args[1]) throw `Contoh:\n${usedPrefix + command} 600 600`
  let res = `https://place.dog/${args[0]}/${args[1]}`
  await conn.sendButton(m.chat, `*Dog:*
  ${args[0]}`, wm, res, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'fotodog2') {
  let res = await fetch(`https://random.dog/woof.json`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Dog:*
  ${command}`, wm, x.url, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'fotofox') {
  let res = await fetch(`https://randomfox.ca/floof/`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Fox:*
  ${x.link}`, wm, x.image, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'fotoshibe') {
  let res = await fetch(`https://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Shibe:*
  ${command}`, wm, x.getRandom(), [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'drinks') {
  let res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*drinks:*\n
  *idDrink:* ${x.drinks[0].idDrink}
  *Drink:* ${x.drinks[0].strDrink}
  *Category:* ${x.drinks[0].strCategory}
  *Glass:* ${x.drinks[0].strGlass}
  *Instructions:* ${x.drinks[0].strInstructions}`, wm, x.drinks[0].strDrinkThumb, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
}

if (command == 'rules') {
let caption = `▣═━–〈 *RULES BOT* 〉–━═▣
│
┊ DILARANG TOXIC
┊ DILARANG SPAM
┊ DILARANG KIRIM VIRTEX
┊ DILARANG KIRIM 18+ APAPUN ITU
┊ DILARANG TELPON / VC
┊ DILARANG CULIK BOT
┊ DILARANG PROMOSI
┊ BOT TIDAK MENERIMA SAVE KONTAK
┊ KALO MELANGGAR AKAN LANGSUNG DIBAN DAN DI BLOKIR TANPA TOLERANSI SEDIKIT PUN
┊
│⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ 
▣═━–〈 *HINATA MD* 〉–━═▣`
await conn.sendButton(m.chat, caption, wm, `${imgr + command}`, [
                ['Ok!', `${usedPrefix}tts id Oke`]
            ], m, fdoc)
         }
         
if (command == 'repeat') {
if (!args[0]) throw `Cth. .repeat 7|Hai`
let urut = text.split`|`
let string = '\n' + urut[1]
let count = urut[0]
let caption = string.repeat(count);
await conn.reply(m.chat, caption, m, frep)
         }
         
if (command == 'repeat2') {
if (!args[0]) throw `Cth. .repeat2 7|Hai`
let urut = text.split`|`
let caption = '';
let i = 1;
while (i < `${urut[0]}`) {
  caption += '\n' + i + ' ' + `${urut[1]}`;
  i++;
}
await conn.reply(m.chat, caption, m, frep)
         }
         
}
handler.command = handler.help = ['urlscan', 'fotoduck', 'fotobear', 'fotodog', 'fotodog2', 'fotofox', 'fotoshibe', 'drinks', 'rules', 'repeat', 'repeat2']
handler.tags = ['random']

export default handler