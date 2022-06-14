import fetch from 'node-fetch'

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
                ['Next', `${usedPrefix + command}anyjoke ${x.setup`]
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
            
            
            
}
handler.command = handler.help = ['katabijak', 'kataquotes', 'listgames', 'aesthetic', 'whois']
handler.tags = ['quotes']
