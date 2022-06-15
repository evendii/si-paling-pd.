let handler = async (m, { conn, text }) => {
if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
if (chat.autoReact) {
    conn.sendMessage(m.chat, {
          react: {
            text: `${pickRandom(['😨','😅','😂','😳','😎', '🥵', '😱', '🐦', '🙄', '🐤','🗿','🐦','🤨','🥴','😐','👆','😔', '👀','👎'])}`,
            key: m.key,
          }})
  }
  }
handler.customPrefix = /(bilek|laik|banh|nihh|tytyd|anjir|dek)/i
handler.command = new RegExp
  
handler.mods = false

export default handler

  function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)]
  }