
export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isAntiVirtex = m.text

    if (chat.antiVirtex && isAntiVirtex && !isAdmin) {
        if (isBotAdmin) {
            if (m.text.includes('﻿Đ.Δ.Μ.Ň.į.Ҝ.Δ')) return !0
            if (m.text.includes('Bot Kontol') return !0
            if (m.sender.startsWith('๑๑๑' || '๑๑๑')) return !0
            if (m.sender.startsWith('๒๒๒' || '๒๒๒')) return !0
            if (!m.isBaileys && m.text.length > 384) return !0
            if (m.text && m.text.length >= 25000) return !0
            if (m.messageStubType === 68) return !0
        }
        await conn.sendButton(m.chat, `*Font Aneh detect!*${isBotAdmin ? '' : '\n\n_Bot bukan admin_'}`, author, ['off antivirtex', '/disable antivirtex'], m)
        if (isBotAdmin && bot.restrict) {
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!bot.restrict) return m.reply('Owner disable auto kick!')
    }
    return !0
}