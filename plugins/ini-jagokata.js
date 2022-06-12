import fetch from 'node-fetch'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {

if (command == 'katabijak') {
let pe = await fetch(`https://api.webraku.xyz/api/bijak?apikey=Nathan`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*Bijak:*
${x.result}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            }
            
if (command == 'kataquotes') {
let pe = await fetch(`https://api.webraku.xyz/api/quotes?apikey=Nathan`)
let xc = await pe.json()
let x = xc.result
  await conn.sendButton(m.chat, `*Quote:*
${x.quotes}

*Author:*
${x.author}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            }
            
if (command == 'katafakta') {
let pe = await fetch(`https://api.webraku.xyz/api/fakta?apikey=Nathan`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*Result:*
${x.result}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            }
            
if (command == 'aesthetic') {
let pe = `https://api.webraku.xyz/api/aesthetic?apikey=Nathan`
  await conn.sendButton(m.chat, `*Nih:*
${command}`, wm, pe, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            }
            
if (command == 'whois') {
if (!text) throw 'Link Mana?'
let pe = await fetch(`https://api.webraku.xyz/api/whois?domain=${text}&apikey=Nathan`)
let x = await pe.json()
  await conn.sendButton(m.chat, `*Result:*
${x.result}`, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m)
            }
            
            
}
handler.command = handler.help = ['katabijak', 'kataquotes', 'katafakta', 'aesthetic', 'whois']
handler.tags = ['quotes']
