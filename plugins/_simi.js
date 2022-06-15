import fetch from 'node-fetch'

export async function before(m, { isAdmin, isBotAdmin }) {
    if (chat.simi) {
        let api = await fetch(`https://simsimi.info/api/?text=${m.text}&lc=id`)
  let res = await api.json()
  m.reply(res.success)
    }
}