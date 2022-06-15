import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {

if (command == 'ppcp2') {
        let res = await fetch(`https://api-xcoders.xyz/api/random/ppcouple?apikey=xcoders`)
if (res.status != 200) throw await res.text()
let json = await res.json()
if (!json.status) throw json
conn.sendButton(m.chat, 'Cewe', wm, json.result.ppcwe, [['🔄 Next 🔄', `/${command}`]], m)
conn.sendButton(m.chat, 'Cowo', wm, json.result.ppcwo, [['🔄 Next 🔄', `/${command}`]], m)
}

if (command == 'ppcp') {
let res = await fetch(`https://yuzzu-api.herokuapp.com/api/couple`)
if (res.status != 200) throw await res.text()
let json = await res.json()
if (!json.status) throw json
conn.sendButton(m.chat, 'Cewe', wm, json.result.female, [['🔄 Next 🔄', `/${command}`]], m)
conn.sendButton(m.chat, 'Cowo', wm, json.result.male, [['🔄 Next 🔄', `/${command}`]], m)
}

}

handler.tags = ['fun']
handler.command = ['ppcp', 'ppcp2']

export default handler