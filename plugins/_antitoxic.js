export async function before(m, { conn, args, usedPrefix, command, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    let isToxic = /^(Bapakao|Tulul|Kontol|Asu|Anj|Ajg|Memek|Gblk|Tolol|Bajingan|Ngentot)$/i.test(m.text)
    if (chat.antiToxic && isToxic && !isAdmin) {
        await conn.sendButton(m.chat, `*Kata Aneh Terdeteksi!*${isBotAdmin ? '' : '\n\n_Bot bukan atmin_'}`, author, ['off antitoxic', '/disable antitoxic'], m)
        if (isBotAdmin && bot.restrict) {
            // await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    global.db.data.users[m.sender].limit = 0
    global.db.data.users[m.sender].exp = 0
    global.db.data.users[m.sender].money = 0
    
    await conn.sendButton(m.chat, `Anda kena sanksi
    Karena berkata ${isToxic}
    Limit anda direset
    
    Ketik *.limit* untuk cek limit`, wm, null, [
        ['Ngechit', `${usedPrefix}ngechit`]
    ], m)
        } else if (!bot.restrict) return m.reply('Gk bisa gw kick!')
    }
    return !0
}