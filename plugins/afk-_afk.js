export function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        let caption = `
  *${conn.getName(user)} berhenti AFK* ${user.afkReason ? ' setelah ' + user.afkReason : ''}
  Selama ${(new Date - user.afk).toTimeString()}
  `.trim()
conn.sendButton(m.chat, caption, author, null, [
        ['Afk Lagi', '.afk Saya Afk lagi :l']
    ], m, { mentions: this.parseMention(caption) })
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''
        let caption = `
  *Jangan tag dia!*
  *${conn.getName(m.sender)}* sedang AFK *${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}*
  Selama ${(new Date - afkTime).toTimeString()}
  `.trim()
conn.sendButton(m.chat, caption, author, null, [
        ['Berhenti', 'Huuu']
    ], m, { mentions: this.parseMention(caption) })
    }
    return true
}
