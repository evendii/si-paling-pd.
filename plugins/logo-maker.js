let handler = async(m, { conn, text, args, usedPrefix, command }) => {
let fdoc = {quoted:{key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `${command}`}}}}

  if (!args[0]) return m.reply(`
  Logo Maker List
Usage: .lmaker butterfly Haloo
burn-paper
butterfly
coffe-cup
double-heart
love-message
love-text
message-under-grass
naruto
romantic
romantic
shadow
smoke
`)
  
  let thm = args[0]
  let text1 = args.slice(1).join(' ')
  
        let images = `https://anabotofc.herokuapp.com/api/photooxy/${thm}?apikey=AnaBot&text=${text1}`
  let caption = `*⎔┉━「 ${command} 」━┉⎔*
🤠 *Query* : ${thm}`
  await conn.sendButton(m.chat, caption, wm, images, [
                ['Next', `${usedPrefix + command}`],
                ['Menu', `${usedPrefix}menu`]
            ], m, fdoc)
            }

handler.help = ['logooxy Master Haloo']
handler.tags = ['maker']
handler.command = /^(logooxy)$/i
export default handler