import didyoumean from 'didyoumean'

export async function before(m, { match, usedPrefix}) {
let fdoc = {quoted:{key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `${await conn.getName(m.sender)}`}}}}

	if ((usedPrefix = (match[0] || '')[0])) {
		let noPrefix = m.text.replace(usedPrefix, '')
		let args = noPrefix.trim().split` `.slice(1)
		let text = args.join` `
		let help = Object.values(plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
		if (help.includes(noPrefix)) return
		let mean = didyoumean(noPrefix, help)
		if (mean) this.sendButton(m.chat, `Apakah yang kamu maksud: *${usedPrefix + mean}*\n`, wm, null, [
                ['Yes', `${usedPrefix + mean} ${text}`],
                ['No', usedPrefix + '?']
            ], m, fdoc)
	}
}
export const disabled = false
