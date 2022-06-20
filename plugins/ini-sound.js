let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Contoh:
${usedPrefix + command} 2

List Number
Max Angka 70

Contoh:
${usedPrefix + command} arigatou

List Alphabet
• anjay
• ara-ara
• ara-ara-cowok
• ara-ara2
• arigatou
• assalamualaikum
• asu
• ayank
• aku-ngakak
• bacot
• bahagia-aku
• baka
• bansos
• beat-box
• beat-box2
• biasalah
• bidadari
• bot
• buka-pintu
• canda-anjing
• cepetan
• cuekin-terus
• daisuki-dayo
• daisuki
• dengan-mu
• gaboleh-gitu
• gak-lucu
• gamau
• gay
• gelay
• gitar
• gomenasai
• hai-bot
• hampa
• hayo
• hp-iphone
• i-like-you
• ih-wibu
• india
• karna-lo-wibu
• kiss
• kontol
• ku-coba
• maju-wibu
• makasih
• mastah
• nande-nande
• nani
• ngadi-ngadi
• nikah 
• nuina
• onichan
• owner-sange
• ownerku
• pak-sapardi
• pale
• pantek
• pasi-pasi
• punten
• sayang
• siapa-sih
• sudah-biasa
• summertime
• tanya-bapak-lu
• to-the-bone
• wajib
• waku
• woi
• yamete
• yowaimo
• yoyowaimo
`

if (isNumber(text)) {
//VN 1
let vn = `https://hansxd.nasihosting.com/sound/sound${text}.mp3`
await conn.sendFile(m.chat, vn, 'song.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true 
})
} else if (!isNumber(text)) {
//VN 2
let vn = `https://raw.githubusercontent.com/saipulanuar/Api-Github/main/audio/${text}.mp3`
await conn.sendFile(m.chat, vn, 'song.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true 
})
} else if (e) {
throw `Error`
}

}
handler.help = ['sound <angka>']
handler.tags = ['random']
handler.command = /^(sound)$/i

export default handler

function isNumber(x) {
    return !isNaN(x)
}