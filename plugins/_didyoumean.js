import didyoumean from 'didyoumean'

export async function before(m, { match, usedPrefix}) {
	if ((usedPrefix = (match[0] || '')[0])) {
		let noPrefix = m.text.replace(usedPrefix, '')
		let args = noPrefix.trim().split` `.slice(1)
		let text = args.join` `
		let alias = Object.values(plugins).filter(v => v.alias && !v.disabled).map(v => v.alias).flat(1)
		if (alias.includes(noPrefix)) return
		let mean = didyoumean(noPrefix, alias)
		if (mean) this.sendButton(m.chat, `*Command tersedia:* ${usedPrefix + mean}?\n`, wm, null, [
                ['Yes', `${usedPrefix + mean} ${text}`],
                ['No', usedPrefix + '?']
            ], m)
	}
}
export const disabled = false
