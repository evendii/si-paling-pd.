let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Contoh:
${usedPrefix + command} 2
Max Angka 70
*Hanya Angka*`
//LIST
let lm = [
'anjay',
'ara-ara',
'ara-ara-cowok',
'ara-ara2',
'arigatou',
'assalamualaikum',
'asu',
'ayank',
'aku-ngakak',
'bacot',
'bahagia-aku',
'baka',
'bansos',
'beat-box',
'beat-box2',
'biasalah',
'bidadari',
'bot',
'buka-pintu',
'canda-anjing',
'cepetan',
'cuekin-terus',
'daisuki-dayo',
'daisuki',
'dengan-mu',
'gaboleh-gitu',
'gak-lucu',
'gamau',
'gay',
'gelay',
'gitar',
'gomenasai',
'hai-bot',
'hampa',
'hayo',
'hp-iphone',
'i-like-you',
'ih-wibu',
'india',
'karna-lo-wibu',
'kiss',
'kontol',
'ku-coba',
'maju-wibu',
'makasih',
'mastah',
'nande-nande',
'nani',
'ngadi-ngadi',
'nikah', 'nuina',
'onichan',
'owner-sange',
'ownerku',
'pak-sapardi',
'pale',
'pantek',
'pasi-pasi',
'punten',
'sayang',
'siapa-sih',
'sudah-biasa',
'summertime',
'tanya-bapak-lu',
'to-the-bone',
'wajib',
'waku',
'woi',
'yamete',
'yowaimo',
'yoyowaimo'
]
nm = 1
nm2 = 0
for (let x of lm) {
const yy = {title: 'Sound ke -'+ nm++,
rows: [
{
title: `${lm[nm2++]}`,
description: `Gwejh mau sound yang ini`,
rowId: `/get https://raw.githubusercontent.com/saipulanuar/Api-Github/main/audio/${x}.mp3`
}
]
}
let h = []
let sections = h.push(yy)
const listM = {
  text: "Pilih Sound Dibawah",
  footer: wm,
  title: "O P T I O N",
  buttonText: "Klik disini",
  sections
}
await conn.sendMessage(m.chat, listM, m)
}

//VN
let vn = `https://hansxd.nasihosting.com/sound/sound${text}.mp3`
await conn.sendFile(m.chat, vn, 'song.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true 
})

}
handler.help = ['sound <angka>']
handler.tags = ['random']
handler.command = /^(sound)$/i

export default handler

