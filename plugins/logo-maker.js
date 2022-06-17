let handler = async(m, { conn, text, args, usedPrefix, command }) => {
let fdoc = {quoted:{key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `${command}`}}}}

  if (!args[0]) return m.reply(`Example : ${usedPrefix + command} buoys|helo|banh
  Logo Maker List
Usage: .lmaker Master|35|Haloo
01 - 11 : calligraphy
12 - 13 : beast
14 - 19 : pubg
20 - 25 : rrr
26 - 27 : free fire
28 - 29 : india
30 - 32 : avengers
33 - 34 : pushpa
35 - 37 : master
38 - 44 : ipl
45      : dhoni
46      : vijay
47 - 52 : kgf`)
  
  let urut = text.split`|`
  let thm = urut[0]
  let text1 = urut[1]
  let text2 = urut[2]
  
        let images = `https://raganork-network.vercel.app/api/logo/${thm}?style=${text1}&text=${text2}`
  let caption = `*⎔┉━「 ${command} 」━┉⎔*
🤠 *Query* : ${thm}`
  await conn.sendButton(m.chat, caption, wm, images, [
                ['Next', `${usedPrefix + command}`],
                ['Menu', `${usedPrefix}menu`]
            ], m, fdoc)
            }

handler.help = ['lmaker Master|35|Haloo']
handler.tags = ['maker']
handler.command = /^(lmaker)$/i
export default handler