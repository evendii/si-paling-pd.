import didyoumean from 'didyoumean'

export async function before(m, { match }) {
	let usedPrefix
	if ((usedPrefix = (match[0] || '')[0])) {
		let noPrefix = m.text.replace(usedPrefix, '')
		let args = noPrefix.trim().split` `.slice(1)
		let text = args.join` `
		let Cmd = Object.values(plugins).filter(v => v.command && !v.disabled).map(v => v.command).flat(1)
		if (Cmd.includes(noPrefix)) return
		let mean = didyoumean(noPrefix, Cmd)
		if (mean) this.sendButton(m.chat, `Did you mean: ${usedPrefix + mean}?\n`, wm, null, [
                ['Yes', `${usedPrefix + mean} ${text}`],
                ['No', usedPrefix + '?']
            ], m)
	}
}
export const disabled = false
