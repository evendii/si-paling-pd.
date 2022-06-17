
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
                let stiker = await sticker(null, global.API(`https://hadi-api.herokuapp.com/api/canvas/${one}?text=${two}`), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
            break
            
        case 'nulis':
                let pe = `https://hadi-api.herokuapp.com/api/canvas/${one}?text=${two}`
    conn.sendFile(m.chat, pe, 'hasil.jpg', '', m)
            break
            
        case 'nulis2':
                let pe = `https://hadi-api.herokuapp.com/api/canvas/${one}?text=${two}`
    conn.sendFile(m.chat, pe, 'hasil.jpg', '', m)
            break
            
        case 'chord':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sayang`
        let f = await fetch(`https://hadi-api.herokuapp.com/api/chord?q=${one}`)
        let x = await f.json()
        let caption = `*Result:* ${x.result}`
        await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'corohelp':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} indonesia`
        let f = await fetch(`https://hadi-api.herokuapp.com/api/corohelp?negara=${one}`)
        let o = await f.json()
        let x = o.result
        let caption = `*terkonfirmasi:* ${x.terkonfirmasi}
*meniggal:* ${x.meniggal}
*sembuh:* ${x.sembuh}
*update:* ${x.update}
`
        await conn.reply(m.chat, caption, m, frep)
            break
            
        case 'cuaca':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sulswesi selatan`
        let f = await fetch(`https://hadi-api.herokuapp.com/api/cuaca?prov=${one}`)
        let o = await f.json()
        let x = o.result
        let caption = `*terkonfirmasi:* ${Array.from(x)}`
        await conn.reply(m.chat, caption, m, frep)
            break
            
        case 'cuttly':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} https://google.com`
        let f = await fetch(`https://hadi-api.herokuapp.com/api/cuttly?url=${one}`)
        let x = await f.json()
        let caption = `*Result:* ${x.result}`
        await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'darkjokes':
        let f = await fetch(`https://hadi-api.herokuapp.com/api/darkjokes`)
        let x = await f.json()
        let caption = `*Result:* ${command}`
        await conn.sendButton(m.chat, caption, wm, x.result, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'detik':
        let f = await fetch(`https://hadi-api.herokuapp.com/api/detik`)
        let o = await f.json()
        let p = o.result
        let x = p.getRandom()
        let caption = `*Result:* ${x.title}
Result:* ${x.link_url}
${x.Time}
`
        await conn.sendButton(m.chat, caption, wm, x.img_url, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'font':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sayang`
        let f = await fetch(`https://hadi-api.herokuapp.com/api/font?teks=${one}`)
        let x = await f.json()
        let caption = `*Result:* ${x.result}`
        await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'font2':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sayang`
        let f = await fetch(`https://hadi-api.herokuapp.com/api/font2?teks=${one}`)
        let x = await f.json()
        let caption = `*Result:* ${x.result}`
        await conn.sendButton(m.chat, caption, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'githubstalk':
            if (!one) throw `Contoh penggunaan ${usedPrefix}${command} sayang`
        let f = await fetch(`https://hadi-api.herokuapp.com/api/githubstalk?username=${one}`)
        let o = await f.json()
        let x = o.result
        let caption = `*Bio:* ${x.bio}
*company:* ${x.company}
*email:* ${x.email}
*t-user:* ${x.twiter_username}
*p-repo:* ${x.public_repo}
*p-gists:* ${x.public_gists}
*follower:* ${x.follower}
*following:* ${x.following}
*location:* ${x.location}
`
        await conn.sendButton(m.chat, caption, wm, x.avatar, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
            
            
            //Sakura
        case 'hijaber':
        case 'harley':
        case 'cecans':
        case 'anony':
                let pe = await fetch(`https://mysakura.herokuapp.com/api/wallpaper/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*Nih*`, wm, x.url, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'waifu':
        case 'nekonime':
        case 'shinobu':
        case 'megumin':
        case 'chobay':
                let pe = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*Nih*`, wm, x.url, [
                ['Next', `${usedPrefix}${command}`]
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
                let pe = await fetch(`https://mysakura.herokuapp.com/api/sfw/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*Nih*`, wm, x.url, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
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
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'bucin':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*Bucin* ${x.result.result}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'pantun':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*pantun* ${x.result.pantun}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'dare':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*dare* ${x.result.dare}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'trut':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*trut* ${x.result.trut}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'aneh':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/truth/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*truth* ${x.result.truth}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'motivasi':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*motivasi* ${x.result.motivasi}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'anime':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/quote/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*quote* ${x.quotes}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'islami':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/quote/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*quote* ${x.result}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'bijak':
        case 'joker':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/quote/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*quote* ${x.result.quotes}`, wm, null, [
                ['Next', `${usedPrefix}${command}`]
            ], m, fdoc)
            break
            
        case 'gambar':
        let pe = await fetch(`https://mysakura.herokuapp.com/api/quote/${args[0]}?apikey=sakura404`)
        let x = await pe.json()
        await conn.sendButton(m.chat, `*quote* ${args[0]}`, wm, x.url, [
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