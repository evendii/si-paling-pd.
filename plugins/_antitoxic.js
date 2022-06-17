/*
let handler = m => m

handler.before = async function (m) {
   if (m.sender.startsWith('๑๑๑' || '๑๑๑')) {
   	global.db.data.users[m.sender].banned = true
conn.reply('Anjay fontnya keren :l')
conn.groupParticipantsUpdate(m.chat, [user], "remove")
   }
   
   if (m.sender.startsWith('๒๒๒' || '๒๒๒')) {
   	global.db.data.users[m.sender].banned = true
conn.reply('Anjay fontnya keren :l')
conn.groupParticipantsUpdate(m.chat, [user], "remove")
   }
   if (!m.isBaileys && m.text.length > 384) {
        global.db.data.users[m.sender].banned = true
conn.reply('Lu kirim apa tong :l')
conn.groupParticipantsUpdate(m.chat, [user], "remove")
    }
    if (m.messageStubType === 68) {
  global.db.data.users[m.sender].banned = true
conn.reply('Lu kirim apa tong :l')
conn.groupParticipantsUpdate(m.chat, [user], "remove")
    }
    if (m.text && m.text.length >= 25000) {
conn.reply('Lu kirim apa tong :l')
conn.groupParticipantsUpdate(m.chat, [user], "remove")
    }
    }
export default handler
*/

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isAntiToxic = m.text

    if (chat.antiToxic && isAntiToxic && !isAdmin) {
        if (isBotAdmin) {
        let kasar = ['kontol', 'anj', 'ajg',
'bangke']
            if (m.text.includes(kasar) return !0
            
        }
        await conn.sendButton(m.chat, `*Kats Aneh detect!*${isBotAdmin ? '' : '\n\n_Bot bukan admin_'}`, author, ['off antitoxic', '/disable antitoxic'], m)
        if (isBotAdmin && bot.restrict) {
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!bot.restrict) return m.reply('Owner disable auto kick!')
    }
    return !0
}