
import axios from 'axios'
import FormData from 'form-data'
import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
import fs from "fs"

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
let frep = { contextInfo: { externalAdReply: {title: global.wm, body: global.author, sourceUrl: snh, thumbnail: fs.readFileSync('./thumbnail.jpg')}}}
let fdoc = {quoted:{key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `${command}`}}}}

let urut = text.split`|`
  let one = urut[1]
  let two = urut[2]
  let three = urut[3]
  
let template = (args[0] || '').toLowerCase()
if (!args[0]) {
let caption = `*Contoh Penggunaan*

${usedPrefix + command} attp`
conn.sendButton(m.chat, caption, wm, null, [
                ['Menu', `${usedPrefix}menu`]
            ], m, fdoc)
            }
            
if (command) {
switch (template) {
            //Hadi
        case 'attp':
                let stiker = await sticker(null, global.API(`https://hadi-api.herokuapp.com/api/canvas/${one}?text=${two}`), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
            break
            
        case 'ttp':
                let stiker1 = await sticker(null, global.API(`https://hadi-api.herokuapp.com/api/canvas/${one}?text=${two}`), global.packname, global.author)
    if (stiker1) return conn.sendFile(m.chat, stiker1, 'sticker.webp', '', m)
    throw stiker1.toString()
            break
            
        case 'nulis':
    conn.sendFile(m.chat, `https://hadi-api.herokuapp.com/api/canvas/${one}?text=${two}`, 'hasil.jpg', '', m)
            break
            
        case 'nulis2':
    conn.sendFile(m.chat, `https://hadi-api.herokuapp.com/api/canvas/${one}?text=${two}`, 'hasil.jpg', '', m)
            break
            
        case 'chord':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sayang`
        let f = await fetch(`https://hadi-api.herokuapp.com/api/chord?q=${one}`)
        let x = await f.json()
        let caption9 = `*Result:* ${x.result}`
        await conn.sendButton(m.chat, caption9, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
        case 'corohelp':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} indonesia`
        let f1 = await fetch(`https://hadi-api.herokuapp.com/api/corohelp?negara=${one}`)
        let o1 = await f1.json()
        let x1 = o1.result
        let caption1 = `*terkonfirmasi:* ${x1.terkonfirmasi}
*meniggal:* ${x1.meniggal}
*sembuh:* ${x1.sembuh}
*update:* ${x1.update}
`
        await conn.sendButton(m.chat, caption1, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
        case 'cuaca':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sulswesi selatan`
        let f2 = await fetch(`https://hadi-api.herokuapp.com/api/cuaca?prov=${one}`)
        let o2 = await f2.json()
        let x2 = o2.result
        let caption2 = `*terkonfirmasi:* ${Array.from(x2)}`
        await conn.sendButton(m.chat, caption2, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
        case 'cuttly':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} https://google.com`
        let f3 = await fetch(`https://hadi-api.herokuapp.com/api/cuttly?url=${one}`)
        let x3 = await f3.json()
        let caption3 = `*Result:* ${x3.result}`
        await conn.sendButton(m.chat, caption3, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
        case 'darkjokes':
        let f4 = await fetch(`https://hadi-api.herokuapp.com/api/darkjokes`)
        let x4 = await f4.json()
        let caption4 = `*Result:* ${command}`
        await conn.sendButton(m.chat, caption4, wm, x4.result, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
        case 'detik':
        let f5 = await fetch(`https://hadi-api.herokuapp.com/api/detik`)
        let o5 = await f5.json()
        let p5 = o5.result
        let x5 = p5.getRandom()
        let caption5 = `*Result:* ${x5.title}
Result:* ${x5.link_url}
${x5.Time}
`
        await conn.sendButton(m.chat, caption5, wm, x5.img_url, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
        case 'font':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sayang`
        let f6 = await fetch(`https://hadi-api.herokuapp.com/api/font?teks=${one}`)
        let x6 = await f6.json()
        let caption6 = `*Result:* ${x6.result}`
        await conn.sendButton(m.chat, caption6, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
        case 'font2':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sayang`
        let f7 = await fetch(`https://hadi-api.herokuapp.com/api/font2?teks=${one}`)
        let x7 = await f.json()
        let caption7 = `*Result:* ${x7.result}`
        await conn.sendButton(m.chat, caption7, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
        case 'githubstalk':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sayang`
        let f8 = await fetch(`https://hadi-api.herokuapp.com/api/githubstalk?username=${one}`)
        let o8 = await f.json()
        let x8 = o8.result
        let caption8 = `*Bio:* ${x8.bio}
*company:* ${x8.company}
*email:* ${x8.email}
*t-user:* ${x8.twiter_username}
*p-repo:* ${x8.public_repo}
*p-gists:* ${x8.public_gists}
*follower:* ${x8.follower}
*following:* ${x8.following}
*location:* ${x8.location}
`
        await conn.sendButton(m.chat, caption8, wm, x8.avatar, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
            //Sakura
            
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
                let pe9 = await fetch(`https://mysakura.herokuapp.com/api/nsfw/${args[0]}?apikey=sakura404`)
        let x9 = await pe9.json()
        await conn.sendButton(m.chat, `${command}`, wm, x9.result, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
            case 'hijaber':
        case 'harley':
        case 'cecans':
        case 'anony':
                let pe8 = await fetch(`https://mysakura.herokuapp.com/api/wallpaper/${args[0]}?apikey=sakura404`)
        let xe8 = await pe8.json()
        await conn.sendButton(m.chat, `${command}`, wm, xe8.url, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
        case 'waifu':
        case 'nekonime':
        case 'shinobu':
        case 'megumin':
        case 'chobay':
                let pe10 = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
        let x10 = await pe10.json()
        await conn.sendButton(m.chat, `${command}`, wm, x10.url, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
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
                let pe11 = await fetch(`https://mysakura.herokuapp.com/api/sfw/${args[0]}?apikey=sakura404`)
        let x11 = await pe11.json()
        await conn.sendButton(m.chat, `${command}`, wm, x11.url, [
                ['Next', `${usedPrefix + command}`]
            ], m, fdoc)
            break
            
        case 'bucin':
        let pe12 = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
        let x12 = await pe12.json()
        await conn.sendButton(m.chat, `*Bucin* ${x12.result.result}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'pantun':
        let pe13 = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
        let x13 = await pe13.json()
        await conn.sendButton(m.chat, `*pantun* ${x13.result.pantun}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'dare':
        let pe14 = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
        let x14 = await pe14.json()
        await conn.sendButton(m.chat, `*dare* ${x14.result.dare}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'trut':
        let pe15 = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
        let x15 = await pe15.json()
        await conn.sendButton(m.chat, `*trut* ${x15.result.trut}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'aneh':
        let pe16 = await fetch(`https://mysakura.herokuapp.com/api/truth/${args[0]}?apikey=sakura404`)
        let x16 = await pe16.json()
        await conn.sendButton(m.chat, `*truth* ${x16.result.truth}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'motivasi':
        let pe17 = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
        let x17 = await pe17.json()
        await conn.sendButton(m.chat, `*motivasi* ${x17.result.motivasi}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'anime':
        let pe19 = await fetch(`https://mysakura.herokuapp.com/api/quote/${args[0]}?apikey=sakura404`)
        let x19 = await pe.json()
        await conn.sendButton(m.chat, `*quote* ${x19.quotes}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'islami':
        let pe20 = await fetch(`https://mysakura.herokuapp.com/api/quote/${args[0]}?apikey=sakura404`)
        let x20 = await pe20.json()
        await conn.sendButton(m.chat, `*quote* ${x20.result}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'bijak':
        case 'joker':
        let pe21 = await fetch(`https://mysakura.herokuapp.com/api/quote/${args[0]}?apikey=sakura404`)
        let x21 = await pe21.json()
        await conn.sendButton(m.chat, `*quote* ${x21.result.quotes}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
            case 'gambar':
        let pe22 = await fetch(`https://mysakura.herokuapp.com/api/quote/${args[0]}?apikey=sakura404`)
        let x22 = await pe22.json()
        await conn.sendButton(m.chat, `*quote* ${args[0]}`, wm, x22.url, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
          }
     }
}
handler.help = ['rmenu <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^rmenu$/i
export default handler