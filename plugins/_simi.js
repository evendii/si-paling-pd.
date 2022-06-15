import fetch from 'node-fetch'

export async function before(m, { isAdmin, isBotAdmin }) {
if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    if (chat.simi) {
        let api = await fetch(`https://simsimi.info/api/?text=${m.text}&lc=id`)
  let res = await api.json()
  m.reply(res.success)
    }
}