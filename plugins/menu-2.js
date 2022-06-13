import axios from 'axios'
import FormData from 'form-data'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command, isPrems }) => {
let urut = args.slice(1).join('|')
  let one = urut[0]
  let two = urut[1]
  let three = urut[2]

let text = args.slice(1).join(' ')

let template = (args[0] || '').toLowerCase()
if (!args[0]) throw `Teksnya?`
if (command) {
switch (template) {

        // Islami //
        case 'listsurah':
            axios
                .get(`https://api.lolhuman.xyz/api/quran?apikey=9b817532fadff8fc7cb86862`)
                .then(({ data }) => {
                    var teks = 'List Surah:\n'
                    for (var x in data.result) {
                        teks += `${x}. ${data.result[x]}\n`
                    }
                    m.reply(teks)
                })
                .catch(console.error)
            break
        case 'alquran':
            if (args.length < 1) return m.reply(`Example: ${usedPrefix + command} 18 or ${usedPrefix + command} 18/10 or ${usedPrefix + command} 18/1-10`)
            axios
                .get(`https://api.lolhuman.xyz/api/quran/${text}?apikey=9b817532fadff8fc7cb86862`)
                .then(({ data }) => {
                    var ayat = data.result.ayat
                    var teks = `QS. ${data.result.surah} : 1-${ayat.length}\n\n`
                    for (var x of ayat) {
                        teks += `${x.arab}\n${x.ayat}. ${x.latin}\n${x.indonesia}\n\n`
                    }
                    teks = teks.replace(/<u>/g, '_').replace(/<\/u>/g, '_')
                    teks = teks.replace(/<strong>/g, '*').replace(/<\/strong>/g, '*')
                    m.reply(teks)
                })
                .catch(console.error)
            break
        case 'alquranaudio':
            if (!text]) return m.reply(`Example: ${usedPrefix + command} 18 or ${usedPrefix + command} 18/10`)
            conn.sendMessage(m.chat, { audio: { url: `https://api.lolhuman.xyz/api/quran/audio/${text}?apikey=9b817532fadff8fc7cb86862` }, mimetype: 'audio/mp4' })
            break
        case 'asmaulhusna':
            axios
                .get(`https://api.lolhuman.xyz/api/asmaulhusna?apikey=9b817532fadff8fc7cb86862`)
                .then(({ data }) => {
                    var teks = `No : ${data.result.index}\n`
                    teks += `Latin: ${data.result.latin}\n`
                    teks += `Arab : ${data.result.ar}\n`
                    teks += `Indonesia : ${data.result.id}\n`
                    teks += `English : ${data.result.en}`
                    m.reply(teks)
                })
                .catch(console.error)
            break
        case 'kisahnabi':
            if (!text]) return m.reply(`Example: ${usedPrefix + command} Muhammad`)
            axios
                .get(`https://api.lolhuman.xyz/api/kisahnabi/${text}?apikey=9b817532fadff8fc7cb86862`)
                .then(({ data }) => {
                    var teks = `Name : ${data.result.name}\n`
                    teks += `Lahir : ${data.result.thn_kelahiran}\n`
                    teks += `Umur : ${data.result.age}\n`
                    teks += `Tempat : ${data.result.place}\n`
                    teks += `Story : \n${data.result.story}`
                    m.reply(teks)
                })
                .catch(console.error)
            break
        case 'jadwalsholat':
            if (!text]) return m.reply(`Example: ${usedPrefix + command} Yogyakarta`)
            axios
                .get(`https://api.lolhuman.xyz/api/sholat/${text}?apikey=9b817532fadff8fc7cb86862`)
                .then(({ data }) => {
                    var teks = `Wilayah : ${data.result.wilayah}\n`
                    teks += `Tanggal : ${data.result.tanggal}\n`
                    teks += `Sahur : ${data.result.sahur}\n`
                    teks += `Imsak : ${data.result.imsak}\n`
                    teks += `Subuh : ${data.result.subuh}\n`
                    teks += `Terbit : ${data.result.terbit}\n`
                    teks += `Dhuha : ${data.result.dhuha}\n`
                    teks += `Dzuhur : ${data.result.dzuhur}\n`
                    teks += `Ashar : ${data.result.ashar}\n`
                    teks += `Maghrib : ${data.result.imsak}\n`
                    teks += `Isya : ${data.result.isya}`
                    m.reply(teks)
                })
                .catch(console.error)
            break

        // Downloader //
        case 'ytplay':
            if (!teks) return await m.reply(`Example: ${usedPrefix + command} melukis senja`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytsearch?apikey=9b817532fadff8fc7cb86862&query=${text}`)
                .then(({ data }) => {
                    axios.get(`https://api.lolhuman.xyz/api/ytaudio2?apikey=9b817532fadff8fc7cb86862&url=https://www.youtube.com/watch?v=${data.result[0].videoId}`).then(({ data }) => {
                        var caption = `❖ Title    : *${data.result.title}*\n`
                        caption += `❖ Size     : *${data.result.size}*`
                        conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
                            conn.sendMessage(m.chat, { audio: { url: data.result.link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                        })
                    })
                })
                .catch(console.error)
            break
        case 'ytsearch':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Melukis Senja`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytsearch?apikey=9b817532fadff8fc7cb86862&query=${text}`)
                .then(({ data }) => {
                    var teks = ''
                    for (var x of data.result) {
                        teks += `Title : ${x.title}\n`
                        teks += `Views : ${x.views}\n`
                        teks += `Published : ${x.published}\n`
                        teks += `Thumbnail : ${x.thumbnail}\n`
                        teks += `Link : https://www.youtube.com/watch?v=${x.videoId}\n\n`
                    }
                    m.reply(teks)
                })
                .catch(console.error)
            break
        case 'ytmp3':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytaudio2?apikey=9b817532fadff8fc7cb86862&url=${text}`)
                .then(({ data }) => {
                    var caption = `❖ Title    : *${data.result.title}*\n`
                    caption += `❖ Size     : *${data.result.size}*`
                    conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
                        conn.sendMessage(m.chat, { audio: { url: data.result.link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                    })
                })
                .catch(console.error)
            break
        case 'ytmp4':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytvideo2?apikey=9b817532fadff8fc7cb86862&url=${text}`)
                .then(({ data }) => {
                    var caption = `❖ Title    : *${data.result.title}*\n`
                    caption += `❖ Size     : *${data.result.size}*`
                    conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
                        conn.sendMessage(m.chat, { audio: { url: data.result.link }, mimetype: 'video/mp4', fileName: `${data.result.title}.mp4` })
                    })
                })
                .catch(console.error)
            break
        case 'telesticker':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://t.me/addstickers/LINE_Menhera_chan_ENG`)
            axios.get(`https://api.lolhuman.xyz/api/telestick?apikey=9b817532fadff8fc7cb86862&url=${text}`).then(({ data }) => {
                conn.sendMessage(m.chat, { sticker: { url: data.result.sticker.random() } })
            })
            break
        case 'tiktoknowm':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
            axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=9b817532fadff8fc7cb86862&url=${text}`).then(({ data }) => {
                conn.sendMessage(m.chat, { video: { url: data.result.link }, mimetype: 'video/mp4' })
            })
            break
        case 'tiktokmusic':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
            conn.sendMessage(m.chat, { audio: { url: `https://api.lolhuman.xyz/api/tiktokmusic?apikey=9b817532fadff8fc7cb86862&url=${text}` }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
            break
        case 'spotify':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://open.spotify.com/track/0ZEYRVISCaqz5yamWZWzaA`)
            axios.get(`https://api.lolhuman.xyz/api/spotify?apikey=9b817532fadff8fc7cb86862&url=${text}`).then(({ data }) => {
                var caption = `Title : ${data.result.title}\n`
                caption += `Artists : ${data.result.artists}\n`
                caption += `Duration : ${data.result.duration}\n`
                caption += `Popularity : ${data.result.popularity}\n`
                caption += `Preview : ${data.result.preview_url}\n`
                conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
                    conn.sendMessage(m.chat, { audio: { url: data.result.link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                })
            })
            break
        case 'spotifysearch':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Melukis Senja`)
            axios.get(`https://api.lolhuman.xyz/api/spotifysearch?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                var teks = ''
                for (var x of data.result) {
                    teks += `Title : ${x.title}\n`
                    teks += `Artists : ${x.artists}\n`
                    teks += `Duration : ${x.duration}\n`
                    teks += `Link : ${x.link}\n`
                    teks += `Preview : ${x.preview_url}\n\n\n`
                }
                m.reply(teks)
            })
            break
        case 'jooxplay':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Melukis Senja`)
            axios.get(`https://api.lolhuman.xyz/api/jooxplay?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                var caption = `Title : ${data.result.info.song}\n`
                caption += `Artists : ${data.result.info.singer}\n`
                caption += `Duration : ${data.result.info.duration}\n`
                caption += `Album : ${data.result.info.album}\n`
                caption += `Uploaded : ${data.result.info.date}\n`
                caption += `Lirik :\n ${data.result.lirik}\n`
                conn.sendMessage(m.chat, { image: { url: data.result.image }, caption }).then(() => {
                    conn.sendMessage(m.chat, { audio: { url: data.result.audio[0].link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                })
            })
            break
        case 'igdl':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
            axios.get(`https://api.lolhuman.xyz/api/instagram?apikey=9b817532fadff8fc7cb86862&url=${text}`).then(({ data }) => {
                var url = data.result
                if (url.includes('.mp4')) {
                    conn.sendMessage(m.chat, { video: { url }, mimetype: 'video/mp4' })
                } else {
                    conn.sendMessage(m.chat, { image: { url } })
                }
            })
            break
        case 'igdl2':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
            axios.get(`https://api.lolhuman.xyz/api/instagram2?apikey=9b817532fadff8fc7cb86862&url=${text}`).then(({ data }) => {
                for (var x of data.result) {
                    if (x.includes('.mp4')) {
                        conn.sendMessage(m.chat, { video: { url: x }, mimetype: 'video/mp4' })
                    } else {
                        conn.sendMessage(m.chat, { image: { url: x } })
                    }
                }
            })
            break
        case 'twtdl':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`)
            axios.get(`https://api.lolhuman.xyz/api/twitter?apikey=9b817532fadff8fc7cb86862&url=${text}`).then(({ data }) => {
                conn.sendMessage(m.chat, { video: { url: data.result.link[data.result.link.length - 1].link }, mimetype: 'video/mp4' })
            })
            break
        case 'fbdl':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`)
            axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=9b817532fadff8fc7cb86862&url=${text}`).then(({ data }) => {
                conn.sendMessage(m.chat, { video: { url: data.result }, mimetype: 'video/mp4' })
            })
            break
        case 'zippyshare':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://www51.zippyshare.com/v/5W0TOBz1/file.html`)
            axios.get(`https://api.lolhuman.xyz/api/zippyshare?apikey=9b817532fadff8fc7cb86862&url=${text}`).then(({ data }) => {
                var teks = `File Name : ${data.result.name_file}\n`
                teks += `Size : ${data.result.size}\n`
                teks += `Date Upload : ${data.result.date_upload}\n`
                teks += `Download Url : ${data.result.download_url}`
                m.reply(teks)
            })
            break
        case 'pinterest':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/pinterest?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                conn.sendMessage(m.chat, { image: { url: data.result } })
            })
            break
        case 'pinterest2':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/pinterest2?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                for (var x of data.result.slice(0, 5)) {
                    conn.sendMessage(m.chat, { image: { url: x } })
                }
            })
            break
        case 'pinterestdl':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://id.pinterest.com/pin/696580267364426905/`)
            axios.get(`https://api.lolhuman.xyz/api/pinterestdl?apikey=9b817532fadff8fc7cb86862&url=${text}`).then(({ data }) => {
                conn.sendMessage(m.chat, { image: { url: data.result[0] } })
            })
            break
        case 'pixiv':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/pixiv?apikey=9b817532fadff8fc7cb86862&query=${text}` } })
            break
        case 'pixivdl':
            if (!text) return m.reply(`Example: ${usedPrefix + command} 63456028`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/pixivdl/${text}?apikey=9b817532fadff8fc7cb86862` } })
            break

        // AniManga //
        case 'character':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Miku Nakano`)
            axios.get(`https://api.lolhuman.xyz/api/character?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                var caption = `Id : ${data.result.id}\n`
                caption += `Name : ${data.result.name.full}\n`
                caption += `Native : ${data.result.name.native}\n`
                caption += `Favorites : ${data.result.favourites}\n`
                caption += `Media : \n`
                for (var x of data.result.media.nodes) {
                    caption += `- ${x.title.romaji} (${x.title.native})\n`
                }
                caption += `\nDescription : \n${data.result.description.replace(/__/g, '_')}`
                conn.sendMessage(m.chat, { image: { url: data.result.image.large }, caption })
            })
            break
        case 'manga':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/manga?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                var caption = `Id : ${data.result.id}\n`
                caption += `Id MAL : ${data.result.idMal}\n`
                caption += `Title : ${data.result.title.romaji}\n`
                caption += `English : ${data.result.title.english}\n`
                caption += `Native : ${data.result.title.native}\n`
                caption += `Format : ${data.result.format}\n`
                caption += `Chapters : ${data.result.chapters}\n`
                caption += `Volume : ${data.result.volumes}\n`
                caption += `Status : ${data.result.status}\n`
                caption += `Source : ${data.result.source}\n`
                caption += `Start Date : ${data.result.startDate.day} - ${data.result.startDate.month} - ${data.result.startDate.year}\n`
                caption += `End Date : ${data.result.endDate.day} - ${data.result.endDate.month} - ${data.result.endDate.year}\n`
                caption += `Genre : ${data.result.genres.join(', ')}\n`
                caption += `Synonyms : ${data.result.synonyms.join(', ')}\n`
                caption += `Score : ${data.result.averageScore}%\n`
                caption += `Characters : \n`
                for (var x of data.result.characters.nodes) {
                    caption += `- ${x.name.full} (${x.name.native})\n`
                }
                caption += `\nDescription : ${data.result.description}`
                conn.sendMessage(m.chat, { image: { url: data.result.coverImage.large }, caption })
            })
            break
        case 'anime':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/anime?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                var caption = `Id : ${data.result.id}\n`
                caption += `Id MAL : ${data.result.idMal}\n`
                caption += `Title : ${data.result.title.romaji}\n`
                caption += `English : ${data.result.title.english}\n`
                caption += `Native : ${data.result.title.native}\n`
                caption += `Format : ${data.result.format}\n`
                caption += `Episodes : ${data.result.episodes}\n`
                caption += `Duration : ${data.result.duration} mins.\n`
                caption += `Status : ${data.result.status}\n`
                caption += `Season : ${data.result.season}\n`
                caption += `Season Year : ${data.result.seasonYear}\n`
                caption += `Source : ${data.result.source}\n`
                caption += `Start Date : ${data.result.startDate.day} - ${data.result.startDate.month} - ${data.result.startDate.year}\n`
                caption += `End Date : ${data.result.endDate.day} - ${data.result.endDate.month} - ${data.result.endDate.year}\n`
                caption += `Genre : ${data.result.genres.join(', ')}\n`
                caption += `Synonyms : ${data.result.synonyms.join(', ')}\n`
                caption += `Score : ${data.result.averageScore}%\n`
                caption += `Characters : \n`
                for (var x of data.result.characters.nodes) {
                    caption += `- ${x.name.full} (${x.name.native})\n`
                }
                caption += `\nDescription : ${data.result.description}`
                conn.sendMessage(m.chat, { image: { url: data.result.coverImage.large }, caption })
            })
            break
        
        case 'kusonime':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://kusonime.com/nanatsu-no-taizai-bd-batch-subtitle-indonesia/`)
            axios.get(`https://api.lolhuman.xyz/api/kusonime?apikey=9b817532fadff8fc7cb86862&url=${text}`).then(({ data }) => {
                var caption = `Title : ${data.result.title}\n`
                caption += `Japanese : ${data.result.japanese}\n`
                caption += `Genre : ${data.result.genre}\n`
                caption += `Seasons : ${data.result.seasons}\n`
                caption += `Producers : ${data.result.producers}\n`
                caption += `Type : ${data.result.type}\n`
                caption += `Status : ${data.result.status}\n`
                caption += `Total Episode : ${data.result.total_episode}\n`
                caption += `Score : ${data.result.score}\n`
                caption += `Duration : ${data.result.duration}\n`
                caption += `Released On : ${data.result.released_on}\n`
                caption += `Desc : ${data.result.desc}\n`
                for (var x in data.result.link_dl) {
                    caption += `\n${x}\n`
                    for (var y in link_dl[x]) {
                        caption += `${y} - ${link_dl[x][y]}\n`
                    }
                }
                conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption })
            })
            break
        case 'kusonimesearch':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/kusonimesearch?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                var caption = `Title : ${data.result.title}\n`
                caption += `Japanese : ${data.result.japanese}\n`
                caption += `Genre : ${data.result.genre}\n`
                caption += `Seasons : ${data.result.seasons}\n`
                caption += `Producers : ${data.result.producers}\n`
                caption += `Type : ${data.result.type}\n`
                caption += `Status : ${data.result.status}\n`
                caption += `Total Episode : ${data.result.total_episode}\n`
                caption += `Score : ${data.result.score}\n`
                caption += `Duration : ${data.result.duration}\n`
                caption += `Released On : ${data.result.released_on}\n`
                caption += `Desc : ${data.result.desc}\n`
                for (var x in data.result.link_dl) {
                    caption += `\n${x}\n`
                    for (var y in link_dl[x]) {
                        caption += `${y} - ${link_dl[x][y]}\n`
                    }
                }
                conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption })
            })
            break
        case 'otakudesu':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://otakudesu.tv/lengkap/pslcns-sub-indo/`)
            axios.get(`https://api.lolhuman.xyz/api/otakudesu?apikey=9b817532fadff8fc7cb86862&url=${text}`).then(({ data }) => {
                var teks = `Title : ${data.result.title}\n`
                teks += `Japanese : ${data.result.japanese}\n`
                teks += `Judul : ${data.result.judul}\n`
                teks += `Type : ${data.result.type}\n`
                teks += `Episode : ${data.result.episodes}\n`
                teks += `Aired : ${data.result.aired}\n`
                teks += `Producers : ${data.result.producers}\n`
                teks += `Genre : ${data.result.genres}\n`
                teks += `Duration : ${data.result.duration}\n`
                teks += `Studios : ${data.result.status}\n`
                teks += `Rating : ${data.result.rating}\n`
                teks += `Credit : ${data.result.credit}\n`
                for (var x in data.result.link_dl) {
                    teks += `\n\n*${data.result.link_dl[x].title}*\n`
                    for (var y in data.result.link_dl[x].link_dl) {
                        ini_info = data.result.link_dl[x].link_dl[y]
                        teks += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`
                        teks += `\`\`\`Size : \`\`\`${ini_info.size}\n`
                        teks += `\`\`\`Link : \`\`\`\n`
                        down_link = ini_info.link_dl
                        for (var z in down_link) {
                            teks += `${z} - ${down_link[z]}\n`
                        }
                    }
                }
                m.reply(teks)
            })
            break
        case 'otakudesusearch':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/otakudesusearch?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                var teks = `Title : ${data.result.title}\n`
                teks += `Japanese : ${data.result.japanese}\n`
                teks += `Judul : ${data.result.judul}\n`
                teks += `Type : ${data.result.type}\n`
                teks += `Episode : ${data.result.episodes}\n`
                teks += `Aired : ${data.result.aired}\n`
                teks += `Producers : ${data.result.producers}\n`
                teks += `Genre : ${data.result.genres}\n`
                teks += `Duration : ${data.result.duration}\n`
                teks += `Studios : ${data.result.status}\n`
                teks += `Rating : ${data.result.rating}\n`
                teks += `Credit : ${data.result.credit}\n`
                for (var x in data.result.link_dl) {
                    teks += `\n\n*${data.result.link_dl[x].title}*\n`
                    for (var y in data.result.link_dl[x].link_dl) {
                        var info = data.result.link_dl[x].link_dl[y]
                        teks += `\n\`\`\`Reso : \`\`\`${info.reso}\n`
                        teks += `\`\`\`Size : \`\`\`${info.size}\n`
                        teks += `\`\`\`Link : \`\`\`\n`
                        var link = info.link_dl
                        for (var z in link) {
                            teks += `${z} - ${link[z]}\n`
                        }
                    }
                }
                m.reply(teks)
            })
            break

        // Information //
        case 'kbbi':
            if (!text) return m.reply(`Example: ${usedPrefix + command} kursi`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/kbbi?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var teks = `\`\`\`Kata : ${data.result[0].nama}\`\`\`\n`
            teks += `\`\`\`Kata Dasar : ${data.result[0].kata_dasar}\`\`\`\n`
            teks += `\`\`\`Pelafalan : ${data.result[0].pelafalan}\`\`\`\n`
            teks += `\`\`\`Bentuk Tidak Baku : ${data.result[0].bentuk_tidak_baku}\`\`\`\n\n`
            for (var x of data.result) {
                teks += `\`\`\`Kode : ${x.makna[0].kelas[0].kode}\`\`\`\n`
                teks += `\`\`\`Kelas : ${x.makna[0].kelas[0].nama}\`\`\`\n`
                teks += `\`\`\`Artinya : \n${x.makna[0].kelas[0].deskripsi}\`\`\`\n\n`
                teks += `\`\`\`Makna Lain : \n${x.makna[0].submakna}\`\`\`\n `
                teks += `\`\`\`Contoh Kalimat : \n${x.makna[0].contoh}\`\`\`\n`
            }
            m.reply(teks)
            break
        case 'brainly':
            if (!text) return m.reply(`Example: ${usedPrefix + command} siapakah sukarno`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/brainly?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var teks = 'Beberapa Pembahasan Dari Brainly :\n\n'
            for (var x of data.result) {
                teks += `==============================\n`
                teks += `\`\`\`Pertanyaan :\`\`\`\n${x.question.content}\n\n`
                teks += `\`\`\`Jawaban :\`\`\`\n${x.answer[0].content}\n`
                teks += `==============================\n\n`
            }
            m.reply(teks)
            break
        case 'jarak':
            if (!text) return m.reply(`Example: ${usedPrefix + command} jakarta - yogyakarta`)
            var teks1 = text.split('-')[0].trim()
            var teks2 = text.split('-')[1].trim()
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jaraktempuh?apikey=9b817532fadff8fc7cb86862&kota1=${teks1}&kota2=${teks2}`)
            var teks = `Informasi Jarak dari ${teks1} ke ${teks2} :\n\n`
            teks += `\`\`\`◪ Asal :\`\`\` ${data.result.from.name}\n`
            teks += `\`\`\`◪ Garis Lintang :\`\`\` ${data.result.from.latitude}\n`
            teks += `\`\`\`◪ Garis Bujur :\`\`\` ${data.result.from.longitude}\n\n`
            teks += `\`\`\`◪ Tujuan :\`\`\` ${data.result.to.name}\n`
            teks += `\`\`\`◪ Garis Lintang :\`\`\` ${data.result.to.latitude}\n`
            teks += `\`\`\`◪ Garis Bujur :\`\`\` ${data.result.to.longitude}\n\n`
            teks += `\`\`\`◪ Jarak Tempuh :\`\`\` ${data.result.jarak}\n`
            teks += `\`\`\`◪ Waktu Tempuh :\`\`\`\n`
            teks += `   ╭───────────────❏\n`
            teks += `❍┤ Kereta Api : ${data.result.kereta_api}\n`
            teks += `❍┤ Pesawat : ${data.result.pesawat}\n`
            teks += `❍┤ Mobil : ${data.result.mobil}\n`
            teks += `❍┤ Motor : ${data.result.motor}\n`
            teks += `❍┤ Jalan Kaki : ${data.result.jalan_kaki}\n`
            teks += `   ╰───────────────❏\n`
            m.reply(teks)
            break
        case 'urbandictionary':
            var { data } = await axios.get(`http://lolhuman.herokuapp.com/api/urdict?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            for (var x of data.result) {
                var teks = `\`\`\`Meaning :\n${x.definition}\`\`\`\n\n`
                teks += `\`\`\`Link : ${x.permalink}\`\`\`\n\n`
                teks += `\`\`\`Sounds Url : ${x.sound_urls[0]}\`\`\`\n\n`
                teks += `\`\`\`Like : ${x.thumbs_up}\`\`\`\n\n`
                teks += `\`\`\`Dislike : ${x.thumbs_down}\`\`\`\n\n`
                teks += `\`\`\`Created On : \n${x.written_on}\`\`\`\n\n`
                teks += `\`\`\`Author : ${x.author}\`\`\`\n\n`
                teks += `\`\`\`Word : ${x.word}\`\`\`\n\n`
                teks += `\`\`\`Defined Id : ${x.defid}\`\`\`\n\n`
                teks += `\`\`\`Example : ${x.example}\`\`\`\n\n`
            }
            m.reply(teks)
            break
        case 'chord':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Melukis senja`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/chord?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var teks = `Title : ${data.result.title}\n`
            teks += `Chord : \n${data.result.chord}`
            m.reply(teks)
            break
        case 'heroml':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Fanny`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/heroml/${text}?apikey=9b817532fadff8fc7cb86862`)
            var caption = `Name : ${data.result.hero_name}\n`
            caption += `Entrance Quotes : ${data.result.ent_quotes}\n`
            caption += `Role : ${data.result.detail.role}\n`
            caption += `Specialty : ${data.result.detail.specialty}\n`
            caption += `Laning : ${data.result.detail.laning_recommendation}\n`
            caption += `Release : ${data.result.detail.release_date}\n`
            caption += `Movement speed : ${data.result.attr.movement_speed}\n`
            caption += `Physical attack : ${data.result.attr.physical_attack}\n`
            caption += `Magic power : ${data.result.attr.magic_power}\n`
            caption += `Physical defense : ${data.result.attr.physical_defense}\n`
            caption += `Magic defense : ${data.result.attr.magic_defense}\n`
            caption += `Critical rate : ${data.result.attr.basic_atk_crit_rate}\n`
            caption += `Hp : ${data.result.attr.hp}\n`
            caption += `Mana : ${data.result.attr.mana}\n`
            caption += `Mana regen : ${data.result.attr.mana_regen}\n`
            conn.sendMessage(m.chat, { image: { url: data.result.icon }, caption })
            break
        case 'mlstalk':
            if (!text) return m.reply(`Example: ${usedPrefix + command} 84830127/2169`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/mobilelegend/${text}?apikey=9b817532fadff8fc7cb86862`)
            m.reply(data.result)
            break
        case 'genshin':
            if (!text) return m.reply(`Example: ${usedPrefix + command} jean`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/genshin/${text}?apikey=9b817532fadff8fc7cb86862`)
            var caption = `Name : ${data.result.title}\n`
            caption += `Intro : ${data.result.intro}\n`
            caption += `Icon : ${data.result.icon}\n`
            await conn.sendMessage(m.chat, { image: { url: data.result.cover1 }, caption })
            await conn.sendMessage(m.chat, { audio: { url: data.result.cv[0].audio[0] }, mimetype: 'audio/mp4' })
            break
        case 'qrreader':
            
            var form = new FormData()
            form.append('img', stream, { filename: 'tahu.jpg' })
            var { data } = await axios.post(`https://api.lolhuman.xyz/api/read-qr?apikey=9b817532fadff8fc7cb86862`, form)
            m.reply('Result: ' + data.result)
            break
        case 'wikipedia':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Tahu`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/wiki?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            m.reply(data.result)
            break
        case 'translate':
            if (!text) return m.reply(`Example: ${usedPrefix + command} en Tahu Bacem`)
            var kode_negara = args[0]
            args.shift()
            var teks = args.join(' ')
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/translate/auto/${kode_negara}?apikey=9b817532fadff8fc7cb86862&text=${teks}`)
            init_txt = `From : ${data.result.from}\n`
            init_txt += `To : ${data.result.to}\n`
            init_txt += `Original : ${data.result.original}\n`
            init_txt += `Translated : ${data.result.translated}\n`
            init_txt += `Pronunciation : ${data.result.pronunciation}\n`
            m.reply(init_txt)
            break
        case 'brainly':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Soekarno adalah`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/brainly?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var teks = 'Result : \n'
            for (var x of data.result) {
                teks += `${x.title}\n`
                teks += `${x.url}\n\n`
            }
            m.reply(teks)
            break
        case 'jadwaltv':
            if (!text) return m.reply(`Example: ${usedPrefix + command} RCTI`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jadwaltv/${text}?apikey=9b817532fadff8fc7cb86862`)
            var teks = `Jadwal TV ${args[0].toUpperCase()}\n`
            for (var x in data.result) {
                teks += `${x} - ${data.result[x]}\n`
            }
            m.reply(teks)
            break
        case 'jadwaltvnow':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jadwaltv/now?apikey=9b817532fadff8fc7cb86862`)
            var teks = `Jadwal TV Now :\n`
            for (var x in data.result) {
                teks += `${x.toUpperCase()}${data.result[x]}\n\n`
            }
            m.reply(teks)
            break
        case 'newsinfo':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/newsinfo?apikey=9b817532fadff8fc7cb86862`)
            var teks = 'Result :\n'
            for (var x of data.result) {
                teks += `Title : ${x.title}\n`
                teks += `Author : ${x.author}\n`
                teks += `Source : ${x.source.name}\n`
                teks += `Url : ${x.url}\n`
                teks += `Published : ${x.publishedAt}\n`
                teks += `Description : ${x.description}\n\n`
            }
            m.reply(teks)
            break
        case 'cnnindonesia':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia?apikey=9b817532fadff8fc7cb86862`)
            var teks = 'Result :\n'
            for (var x of data.result) {
                teks += `Judul : ${x.judul}\n`
                teks += `Link : ${x.link}\n`
                teks += `Tipe : ${x.tipe}\n`
                teks += `Published : ${x.waktu}\n\n`
            }
            m.reply(teks)
            break
        case 'cnnnasional':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia/nasional?apikey=9b817532fadff8fc7cb86862`)
            var teks = 'Result :\n'
            for (var x of data.result) {
                teks += `Judul : ${x.judul}\n`
                teks += `Link : ${x.link}\n`
                teks += `Tipe : ${x.tipe}\n`
                teks += `Published : ${x.waktu}\n\n`
            }
            m.reply(teks)
            break
        case 'cnninternasional':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia/internasional?apikey=9b817532fadff8fc7cb86862`)
            var teks = 'Result :\n'
            for (var x of data.result) {
                teks += `Judul : ${x.judul}\n`
                teks += `Link : ${x.link}\n`
                teks += `Tipe : ${x.tipe}\n`
                teks += `Published : ${x.waktu}\n\n`
            }
            m.reply(teks)
            break
        case 'infogempa':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/infogempa?apikey=9b817532fadff8fc7cb86862`)
            var caption = `Lokasi : ${data.result.lokasi}\n`
            caption += `Waktu : ${data.result.waktu}\n`
            caption += `Potensi : ${data.result.potensi}\n`
            caption += `Magnitude : ${data.result.magnitude}\n`
            caption += `Kedalaman : ${data.result.kedalaman}\n`
            caption += `Koordinat : ${data.result.koordinat}`
            conn.sendMessage(m.chat, { image: { url: data.result.map }, caption })
            break
        case 'lirik':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Melukis Senja`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/lirik?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            m.reply(data.result)
            break
        case 'cuaca':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Yogyakarta`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cuaca/${text}?apikey=9b817532fadff8fc7cb86862`)
            var teks = `Tempat : ${data.result.tempat}\n`
            teks += `Cuaca : ${data.result.cuaca}\n`
            teks += `Angin : ${data.result.angin}\n`
            teks += `Description : ${data.result.description}\n`
            teks += `Kelembapan : ${data.result.kelembapan}\n`
            teks += `Suhu : ${data.result.suhu}\n`
            teks += `Udara : ${data.result.udara}\n`
            teks += `Permukaan laut : ${data.result.permukaan_laut}\n`
            conn.sendMessage(m.chat, { location: { degreesLatitude: data.result.latitude, degreesLongitude: data.result.longitude } })
            m.reply(teks)
            break
        case 'covidindo':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/corona/indonesia?apikey=9b817532fadff8fc7cb86862`)
            var teks = `Positif : ${data.result.positif}\n`
            teks += `Sembuh : ${data.result.sembuh}\n`
            teks += `Dirawat : ${data.result.dirawat}\n`
            teks += `Meninggal : ${data.result.meninggal}`
            m.reply(teks)
            break
        case 'covidglobal':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/corona/global?apikey=9b817532fadff8fc7cb86862`)
            var teks = `Positif : ${data.result.positif}\n`
            teks += `Sembuh : ${data.result.sembuh}\n`
            teks += `Dirawat : ${data.result.dirawat}\n`
            teks += `Meninggal : ${data.result.meninggal}`
            m.reply(teks)
            break
        case 'kodepos':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Slemanan or ${usedPrefix + command} 66154`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/kodepos?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var teks = `Provinsi : ${data.result[0].province}\n`
            teks += `Kabupaten : ${data.result[0].city}\n`
            teks += `Kecamatan : ${data.result[0].subdistrict}\n`
            teks += `Kelurahan : ${data.result[0].urban}\n`
            teks += `Kode Pos : ${data.result[0].postalcode}`
            m.reply(teks)
            break
        case 'jadwalbola':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jadwalbola?apikey=9b817532fadff8fc7cb86862`)
            var teks = 'Jadwal Bola :\n'
            for (var x of data.result) {
                teks += `Hari : ${x.hari}\n`
                teks += `Jam : ${x.jam}\n`
                teks += `Event : ${x.event}\n`
                teks += `Match : ${x.match}\n`
                teks += `TV : ${x.tv}\n\n`
            }
            m.reply(teks)
            break
        case 'indbeasiswa':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/indbeasiswa?apikey=9b817532fadff8fc7cb86862`)
            var teks = 'Info Beasiswa :\n'
            for (var x of data.result) {
                teks += `Title : ${x.title}\n`
                teks += `Link : ${x.link}\n\n`
            }
            m.reply(teks)
            break
        case 'hoax':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/turnbackhoax?apikey=9b817532fadff8fc7cb86862`)
            var teks = 'Info Hoax :\n'
            for (var x of data.result) {
                teks += `Title : ${x.title}\n`
                teks += `Link : ${x.link}\n`
                teks += `Posted : ${x.posted}\n`
                teks += `Description : ${x.desc}\n\n`
            }
            m.reply(teks)
            break
        case 'nsfwcheck':
            
            var form = new FormData()
            form.append('img', stream, { filename: 'tahu.jpg' })
            var { data } = await axios.post(`https://api.lolhuman.xyz/api/nsfwcheck?apikey=9b817532fadff8fc7cb86862`, form)
            var is_nsfw = 'No'
            if (Number(data.result.replace('%', '')) >= 50) {
                is_nsfw = 'Yes'
            }
            m.reply(`Is NSFW? ${is_nsfw}\nNSFW Score : ${data.result}`)
            break
        case 'ocr':
            
            var form = new FormData()
            form.append('img', stream, { filename: 'tahu.jpg' })
            var { data } = await axios.post(`https://api.lolhuman.xyz/api/ocr?apikey=9b817532fadff8fc7cb86862`, form)
            m.reply(`Result : ${data.result}`)
            break

        // Movie & Story
        case 'lk21':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Transformer`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/lk21?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var caption = `Title : ${data.result.title}\n`
            caption += `Link : ${data.result.link}\n`
            caption += `Genre : ${data.result.genre}\n`
            caption += `Views : ${data.result.views}\n`
            caption += `Duration : ${data.result.duration}\n`
            caption += `Tahun : ${data.result.tahun}\n`
            caption += `Rating : ${data.result.rating}\n`
            caption += `Desc : ${data.result.desc}\n`
            caption += `Actors : ${data.result.actors.join(', ')}\n`
            caption += `Location : ${data.result.location}\n`
            caption += `Date Release : ${data.result.date_release}\n`
            caption += `Language : ${data.result.language}\n`
            caption += `Link Download : ${data.result.link_dl}`
            conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption })
            break
        case 'drakorongoing':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/drakorongoing?apikey=9b817532fadff8fc7cb86862`)
            var teks = 'Ongoing Drakor\n\n'
            for (var x of data.result) {
                teks += `Title : ${x.title}\n`
                teks += `Link : ${x.link}\n`
                teks += `Thumbnail : ${x.thumbnail}\n`
                teks += `Year : ${x.category}\n`
                teks += `Total Episode : ${x.total_episode}\n`
                teks += `Genre : ${x.genre.join(', ')}\n\n`
            }
            m.reply(teks)
            break
        case 'wattpad':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://www.wattpad.com/707367860-kumpulan-quote-tere-liye-tere-liye-quote-quote`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/wattpad?apikey=9b817532fadff8fc7cb86862&url=${text}`)
            var caption = `Title : ${data.result.title}\n`
            caption += `Rating : ${data.result.rating}\n`
            caption += `Motify date : ${data.result.modifyDate}\n`
            caption += `Create date: ${data.result.createDate}\n`
            caption += `Word : ${data.result.word}\n`
            caption += `Comment : ${data.result.comment}\n`
            caption += `Vote : ${data.result.vote}\n`
            caption += `Reader : ${data.result.reader}\n`
            caption += `Pages : ${data.result.pages}\n`
            caption += `Description : ${data.result.desc}\n\n`
            caption += `Story : \n${data.result.story}`
            conn.sendMessage(m.chat, { image: { url: data.result.photo }, caption })
            break
        case 'wattpadsearch':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Tere Liye`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/wattpadsearch?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var teks = 'Wattpad Seach : \n'
            for (var x of data.result) {
                teks += `Title : ${x.title}\n`
                teks += `Url : ${x.url}\n`
                teks += `Part : ${x.parts}\n`
                teks += `Motify date : ${x.modifyDate}\n`
                teks += `Create date: ${x.createDate}\n`
                teks += `Coment count: ${x.commentCount}\n\n`
            }
            m.reply(teks)
            break
        case 'cerpen':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cerpen?apikey=9b817532fadff8fc7cb86862`)
            var teks = `Title : ${data.result.title}\n`
            teks += `Creator : ${data.result.creator}\n`
            teks += `Story :\n${data.result.cerpen}`
            m.reply(teks)
            break
        case 'ceritahoror':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/ceritahoror?apikey=9b817532fadff8fc7cb86862`)
            var caption = `Title : ${data.result.title}\n`
            caption += `Desc : ${data.result.desc}\n`
            caption += `Story :\n${data.result.story}\n`
            conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption })
            break

        // Searching
        case 'gimage':
        case 'konachan':
        case 'wallpapersearch':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            if (command === 'wallpapersearch') {
                command = 'wallpaper'
            }
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/${args[0]}?apikey=9b817532fadff8fc7cb86862&query=${text}` } })
            break
        case 'gimage2':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/gimage2?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                for (var x of data.result.slice(0, 5)) {
                    conn.sendMessage(m.chat, { image: { url: x } })
                }
            })
            break
        case 'wallpapersearch2':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/wallpaper2?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                conn.sendMessage(m.chat, { image: { url: data.result } })
            })
            break
        case 'playstore':
            if (!text) return m.reply(`Example: ${usedPrefix + command} telegram`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/playstore?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var teks = 'Play Store Search : \n'
            for (var x of data.result) {
                teks += `Name : ${x.title}\n`
                teks += `ID : ${x.appId}\n`
                teks += `Developer : ${x.developer}\n`
                teks += `Link : ${x.url}\n`
                teks += `Price : ${x.priceText}\n`
                teks += `Price : ${x.price}\n\n`
            }
            m.reply(teks)
            break
        case 'shopee':
            if (!text) return m.reply(`Example: ${usedPrefix + command} tas gendong`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/shopee?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var teks = 'Shopee Search : \n'
            for (var x of data.result) {
                teks += `Name : ${x.name}\n`
                teks += `Terjual : ${x.sold}\n`
                teks += `Stock : ${x.stock}\n`
                teks += `Lokasi : ${x.shop_loc}\n`
                teks += `Link : ${x.link_produk}\n\n`
            }
            m.reply(teks)
            break
        case 'google':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/gsearch?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var teks = 'Google Search : \n'
            for (var x of data.result) {
                teks += `Title : ${x.title}\n`
                teks += `Link : ${x.link}\n`
                teks += `Desc : ${x.desc}\n\n`
            }
            m.reply(teks)
            break

        // Random Text //
        case 'quotes':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/quotes?apikey=9b817532fadff8fc7cb86862`)
            m.reply(`_${data.result.quote}_\n\n*― ${data.result.by}*`)
            break
        case 'quotesanime':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/quotesnime?apikey=9b817532fadff8fc7cb86862`)
            m.reply(`_${data.result.quote}_\n\n*― ${data.result.character}*\n*― ${data.result.anime} ${data.result.episode}*`)
            break
        case 'quotesdilan':
            quotedilan = await axios.get(`https://api.lolhuman.xyz/api/quotes/dilan?apikey=9b817532fadff8fc7cb86862`)
            m.reply(quotedilan.result)
            break
        case 'faktaunik':
        case 'katabijak':
        case 'pantun':
        case 'bucin':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/${teks}?apikey=9b817532fadff8fc7cb86862`)
            m.reply(data.result)
            break
        case 'randomnama':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/nama?apikey=9b817532fadff8fc7cb86862`)
            m.reply(data.result)
            break

        // Entertainment
        case 'asupan':
            axios.get(`https://api.lolhuman.xyz/api/asupan?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                conn.sendMessage(m.chat, { video: { url: data.result }, mimetype: 'video/mp4' })
            })
            break
        case 'wancak':
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/onecak?apikey=9b817532fadff8fc7cb86862` } })
            break

        // Primbon
        case 'artinama':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Hinata MD`)
            axios.get(`https://api.lolhuman.xyz/api/artinama?apikey=9b817532fadff8fc7cb86862&nama=${text}`).then(({ data }) => {
                m.reply(data.result)
            })
            break
        case 'jodoh':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Tahu & Bacem`)
            axios.get(`https://api.lolhuman.xyz/api/jodoh/${text.split('&')[0]}/${text.split('&')[1]}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                var teks = `Positif : ${data.result.positif}\n`
                teks += `Negative : ${data.result.negatif}\n`
                teks += `Deskripsi : ${data.result.deskripsi}`
                m.reply(teks)
            })
            break
        case 'weton':
            if (!text) return m.reply(`Example: ${usedPrefix + command} 12 12 2020`)
            axios.get(`https://api.lolhuman.xyz/api/weton/${args[0]}/${args[1]}/${args[2]}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                var teks = `Weton : ${data.result.weton}\n`
                teks += `Pekerjaan : ${data.result.pekerjaan}\n`
                teks += `Rejeki : ${data.result.rejeki}\n`
                teks += `Jodoh : ${data.result.jodoh}`
                m.reply(teks)
            })
            break
        case 'jadian':
            if (!text) return m.reply(`Example: ${usedPrefix + command} 12 12 2020`)
            axios.get(`https://api.lolhuman.xyz/api/jadian/${args[0]}/${args[1]}/${args[2]}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                var teks = `Karakteristik : ${data.result.karakteristik}\n`
                teks += `Deskripsi : ${data.result.deskripsi}`
                m.reply(teks)
            })
            break
        case 'tebakumur':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Hinata MD`)
            axios.get(`https://api.lolhuman.xyz/api/tebakumur?apikey=9b817532fadff8fc7cb86862&name=${text}`).then(({ data }) => {
                var teks = `Nama : ${data.result.name}\n`
                teks += `Umur : ${data.result.age}`
                m.reply(teks)
            })
            break

        case '1977':
        case 'aden':
        case 'brannan':
        case 'brooklyn':
        case 'clarendon':
        case 'gingham':
        case 'hudson':
        case 'inkwell':
        case 'earlybird':
        case 'kelvin':
        case 'lark':
        case 'lofi':
        case 'maven':
        case 'mayfair':
        case 'moon':
        case 'nashville':
        case 'perpetua':
        case 'reyes':
        case 'rise':
        case 'slumber':
        case 'stinson':
        case 'toaster':
        case 'valencia':
        case 'walden':
        case 'willow':
        case 'xpro2':
        case 'pencil':
        case 'quotemaker3':
        case 'roundsticker':
        case 'stickerwm':
            var url = `https://api.lolhuman.xyz/api/filter/${args[0]}?apikey=9b817532fadff8fc7cb86862`
            var form = new FormData()
            form.append('img', stream, 'tahu.jpg')

            if (command === 'pencil') {
                url = `https://api.lolhuman.xyz/api/editor/pencil?apikey=9b817532fadff8fc7cb86862`
            }
            if (command === 'quotemaker3') {
                url = `https://api.lolhuman.xyz/api/quotemaker3?apikey=9b817532fadff8fc7cb86862`
                form.append('text', text)
            }
            if (command === 'roundsticker') {
                url = `https://api.lolhuman.xyz/api/convert/towebpwround?apikey=9b817532fadff8fc7cb86862`
            }
            if (command === 'stickerwm') {
                url = `https://api.lolhuman.xyz/api/convert/towebpauthor?apikey=9b817532fadff8fc7cb86862`
                form.append('package', 'LoL')
                form.append('author', 'Human')
            }

            axios
                .post(url, form, { responseType: 'arraybuffer' })
                .then(({ data }) => {
                    if (command === 'roundsticker' || command === 'stickerwm') {
                        return conn.sendMessage(m.chat, { sticker: data })
                    }
                    conn.sendMessage(m.chat, { image: data })
                })
                .catch(console.error)
            break
        
        // Stalk
        case 'stalkig':
            if (!text) return m.reply(`Example: ${usedPrefix + command} jessnolimit`)
            axios.get(`https://api.lolhuman.xyz/api/stalkig/${text}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                var caption = `Username : ${data.result.username}\n`
                caption += `Full Name : ${data.result.fullname}\n`
                caption += `Posts : ${data.result.posts}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Following : ${data.result.following}\n`
                caption += `Bio : ${data.result.bio}`
                conn.sendMessage(m.chat, { image: { url: data.result.photo_profile }, caption })
            })
            break
        case 'stalkgithub':
            if (!text) return m.reply(`Example: ${usedPrefix + command} LoL-Human`)
            axios.get(`https://api.lolhuman.xyz/api/github/${text}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                var caption = `Name : ${data.result.name}\n`
                caption += `Link : ${data.result.url}\n`
                caption += `Public Repo : ${data.result.public_repos}\n`
                caption += `Public Gists : ${data.result.public_gists}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Following : ${data.result.following}\n`
                caption += `Bio : ${data.result.bio}`
                conn.sendMessage(m.chat, { image: { url: data.result.avatar }, caption })
            })
            break
        case 'stalktwitter':
            if (!text) return m.reply(`Example: ${usedPrefix + command} jokowi`)
            axios.get(`https://api.lolhuman.xyz/api/twitter/${text}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                var caption = `Username : ${data.result.screen_name}\n`
                caption += `Name : ${data.result.name}\n`
                caption += `Tweet : ${data.result.tweet}\n`
                caption += `Joined : ${data.result.joined}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Following : ${data.result.following}\n`
                caption += `Like : ${data.result.like}\n`
                caption += `Description : ${data.result.description}`
                conn.sendMessage(m.chat, { image: { url: data.result.profile_picture }, caption })
            })
            break
        case 'stalktiktok':
            if (!text]) return m.reply(`Example: ${usedPrefix + command} bulansutena`)
            axios.get(`https://api.lolhuman.xyz/api/stalktiktok/${text}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                var caption = `Username : ${data.result.username}\n`
                caption += `Nickname : ${data.result.nickname}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Followings : ${data.result.followings}\n`
                caption += `Likes : ${data.result.likes}\n`
                caption += `Video : ${data.result.video}\n`
                caption += `Bio : ${data.result.bio}\n`
                conn.sendMessage(m.chat, { image: { url: data.result.user_picture }, caption })
            })
            break

        // Other
        case 'ssweb':
            if (!text]) return m.reply(`Example: ${usedPrefix + command} https://api.lolhuman.xyz`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/ssweb?apikey=9b817532fadff8fc7cb86862&url=${text}` } })
            break
        case 'ssweb2':
            if (!text]) return m.reply(`Example: ${usedPrefix + command} https://api.lolhuman.xyz`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/sswebfull?apikey=9b817532fadff8fc7cb86862&url=${text}` } })
            break
        case 'shortlink':
            if (!text]) return m.reply(`Example: ${usedPrefix + command} https://api.lolhuman.xyz`)
            axios.get(`https://api.lolhuman.xyz/api/ouoshortlink?apikey=9b817532fadff8fc7cb86862&url=${text}`).then(({ data }) => {
                m.reply(data.result)
            })
            break

        // Random Image //
        case 'art':
        case 'bts':
        case 'exo':
        case 'elf':
        case 'loli':
        case 'neko':
        case 'waifu':
        case 'shota':
        case 'husbu':
        case 'sagiri':
        case 'shinobu':
        case 'megumin':
        case 'wallnime':
        case 'quotesimage':
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/random/${args[0]}?apikey=9b817532fadff8fc7cb86862` } })
            break

        case 'chiisaihentai':
        case 'trap':
        case 'blowjob':
        case 'yaoi':
        case 'ecchi':
        case 'hentai':
        case 'ahegao':
        case 'hololewd':
        case 'sideoppai':
        case 'animefeets':
        case 'animebooty':
        case 'animethighss':
        case 'hentaiparadise':
        case 'animearmpits':
        case 'hentaifemdom':
        case 'lewdanimegirls':
        case 'biganimetiddies':
        case 'animebellybutton':
        case 'hentai4everyone':
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/random/nsfw/${args[0]}?apikey=9b817532fadff8fc7cb86862` } })
            break

        case 'bj':
        case 'ero':
        case 'cum':
        case 'feet':
        case 'yuri':
        case 'trap':
        case 'lewd':
        case 'feed':
        case 'eron':
        case 'solo':
        case 'gasm':
        case 'poke':
        case 'anal':
        case 'holo':
        case 'tits':
        case 'kuni':
        case 'kiss':
        case 'erok':
        case 'smug':
        case 'baka':
        case 'solog':
        case 'feetg':
        case 'lewdk':
        case 'waifu':
        case 'pussy':
        case 'femdom':
        case 'cuddle':
        case 'hentai':
        case 'eroyuri':
        case 'cum_jpg':
        case 'blowjob':
        case 'erofeet':
        case 'holoero':
        case 'classic':
        case 'erokemo':
        case 'fox_girl':
        case 'futanari':
        case 'lewdkemo':
        case 'wallpaper':
        case 'pussy_jpg':
        case 'kemonomimi':
        case 'nsfw_avatar':
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/random2/${args[0]}?apikey=9b817532fadff8fc7cb86862` } })
            break

        // Textprome //
        case 'blackpink':
        case 'neon':
        case 'greenneon':
        case 'advanceglow':
        case 'futureneon':
        case 'sandwriting':
        case 'sandsummer':
        case 'sandengraved':
        case 'metaldark':
        case 'neonlight':
        case 'holographic':
        case 'text1917':
        case 'minion':
        case 'deluxesilver':
        case 'newyearcard':
        case 'bloodfrosted':
        case 'halloween':
        case 'jokerlogo':
        case 'fireworksparkle':
        case 'natureleaves':
        case 'bokeh':
        case 'toxic':
        case 'strawberry':
        case 'box3d':
        case 'roadwarning':
        case 'breakwall':
        case 'icecold':
        case 'luxury':
        case 'cloud':
        case 'summersand':
        case 'horrorblood':
        case 'thunder':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Hinata MD`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/textprome/${args[0]}?apikey=9b817532fadff8fc7cb86862&text=${text}` } })
            break

        case 'pornhub':
        case 'glitch':
        case 'avenger':
        case 'space':
        case 'ninjalogo':
        case 'marvelstudio':
        case 'lionlogo':
        case 'wolflogo':
        case 'steel3d':
        case 'wallgravity':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Hinata MD`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/textprome2/${args[0]}?apikey=9b817532fadff8fc7cb86862&text1=${two}&text2=${three}` } })
            break

        // Photo Oxy //
        case 'shadow':
        case 'cup':
        case 'cup1':
        case 'romance':
        case 'smoke':
        case 'burnpaper':
        case 'lovemessage':
        case 'undergrass':
        case 'love':
        case 'coffe':
        case 'woodheart':
        case 'woodenboard':
        case 'summer3d':
        case 'wolfmetal':
        case 'nature3d':
        case 'underwater':
        case 'golderrose':
        case 'summernature':
        case 'letterleaves':
        case 'glowingneon':
        case 'fallleaves':
        case 'flamming':
        case 'harrypotter':
        case 'carvedwood':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Hinata MD`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/photooxy1/${args[0]}?apikey=9b817532fadff8fc7cb86862&text=${text}` } })
            break

        case 'tiktok':
        case 'arcade8bit':
        case 'battlefield4':
        case 'pubg':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Hinata MD`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/photooxy2/${args[0]}?apikey=9b817532fadff8fc7cb86862&text1=${two}&text2=${three}` } })
            break

        // Ephoto 360 //
        case 'wetglass':
        case 'multicolor3d':
        case 'watercolor':
        case 'luxurygold':
        case 'galaxywallpaper':
        case 'lighttext':
        case 'beautifulflower':
        case 'puppycute':
        case 'royaltext':
        case 'heartshaped':
        case 'birthdaycake':
        case 'galaxystyle':
        case 'hologram3d':
        case 'greenneon':
        case 'glossychrome':
        case 'greenbush':
        case 'metallogo':
        case 'noeltext':
        case 'glittergold':
        case 'textcake':
        case 'starsnight':
        case 'wooden3d':
        case 'textbyname':
        case 'writegalacy':
        case 'galaxybat':
        case 'snow3d':
        case 'birthdayday':
        case 'goldplaybutton':
        case 'silverplaybutton':
        case 'freefire':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Hinata MD`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/ephoto1/${args[0]}?apikey=9b817532fadff8fc7cb86862&text=${text}` } })
            break
}
}
}
handler.help = ['lolmenu <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^lol|lolmenu|m2$/i
export default handler