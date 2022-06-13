
import axios from 'axios';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command, isPrems }) => {
switch (command) {
        case 'xowner':
            const vcard =
                'BEGIN:VCARD\n' + // metadata of the contact card
                'VERSION:3.0\n' +
                `FN:${global.author}ow\n` + // full name
                `ORG:${global.wm};\n` + // the organization of the contact
                `TEL;type=MSG;type=CELL;type=VOICE;waid=${owner[owner.length - 1].split('@')[0]}:+${owner[owner.length - 1].split('@')[0]}\n` + // WhatsApp ID + phone number
                'END:VCARD'

            conn.sendMessage(m.chat, {
                contacts: {
                    displayName: wm,
                    contacts: [{ vcard }],
                },
            })
            break

        // Islami //
        case 'xlistsurah':
            axios
                .get(`https://api.lolhuman.xyz/api/quran?apikey=9b817532fadff8fc7cb86862`)
                .then(({ data }) => {
                    var text = 'List Surah:\n'
                    for (var x in data.result) {
                        text += `${x}. ${data.result[x]}\n`
                    }
                    m.reply(text)
                })
                .catch(console.error)
            break
        case 'xalquran':
            if (args.length < 1) return m.reply(`Example: ${usedPrefix + command} 18 or ${usedPrefix + command} 18/10 or ${usedPrefix + command} 18/1-10`)
            axios
                .get(`https://api.lolhuman.xyz/api/quran/${args[0]}?apikey=9b817532fadff8fc7cb86862`)
                .then(({ data }) => {
                    var ayat = data.result.ayat
                    var text = `QS. ${data.result.surah} : 1-${ayat.length}\n\n`
                    for (var x of ayat) {
                        text += `${x.arab}\n${x.ayat}. ${x.latin}\n${x.indonesia}\n\n`
                    }
                    text = text.replace(/<u>/g, '_').replace(/<\/u>/g, '_')
                    text = text.replace(/<strong>/g, '*').replace(/<\/strong>/g, '*')
                    m.reply(text)
                })
                .catch(console.error)
            break
        case 'xalquranaudio':
            if (!text) return m.reply(`Example: ${usedPrefix + command} 18 or ${usedPrefix + command} 18/10`)
            conn.sendMessage(m.chat, { audio: { url: `https://api.lolhuman.xyz/api/quran/audio/${args[0]}?apikey=9b817532fadff8fc7cb86862` }, mimetype: 'audio/mp4' })
            break
        case 'xasmaulhusna':
            axios
                .get(`https://api.lolhuman.xyz/api/asmaulhusna?apikey=9b817532fadff8fc7cb86862`)
                .then(({ data }) => {
                    var text = `No : ${data.result.index}\n`
                    text += `Latin: ${data.result.latin}\n`
                    text += `Arab : ${data.result.ar}\n`
                    text += `Indonesia : ${data.result.id}\n`
                    text += `English : ${data.result.en}`
                    m.reply(text)
                })
                .catch(console.error)
            break
        case 'xkisahnabi':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Muhammad`)
            axios
                .get(`https://api.lolhuman.xyz/api/kisahnabi/${text}?apikey=9b817532fadff8fc7cb86862`)
                .then(({ data }) => {
                    var text = `Name : ${data.result.name}\n`
                    text += `Lahir : ${data.result.thn_kelahiran}\n`
                    text += `Umur : ${data.result.age}\n`
                    text += `Tempat : ${data.result.place}\n`
                    text += `Story : \n${data.result.story}`
                    m.reply(text)
                })
                .catch(console.error)
            break
        case 'xjadwalsholat':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Yogyakarta`)
            axios
                .get(`https://api.lolhuman.xyz/api/sholat/${daerah}?apikey=9b817532fadff8fc7cb86862`)
                .then(({ data }) => {
                    var text = `Wilayah : ${data.result.wilayah}\n`
                    text += `Tanggal : ${data.result.tanggal}\n`
                    text += `Sahur : ${data.result.sahur}\n`
                    text += `Imsak : ${data.result.imsak}\n`
                    text += `Subuh : ${data.result.subuh}\n`
                    text += `Terbit : ${data.result.terbit}\n`
                    text += `Dhuha : ${data.result.dhuha}\n`
                    text += `Dzuhur : ${data.result.dzuhur}\n`
                    text += `Ashar : ${data.result.ashar}\n`
                    text += `Maghrib : ${data.result.imsak}\n`
                    text += `Isya : ${data.result.isya}`
                    m.reply(text)
                })
                .catch(console.error)
            break

        // Downloader //
        case 'xytplay':
            if (!text) return await m.reply(`Example: ${usedPrefix + command} melukis senja`)
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
        case 'xytsearch':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Melukis Senja`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytsearch?apikey=9b817532fadff8fc7cb86862&query=${text}`)
                .then(({ data }) => {
                    var text = ''
                    for (var x of data.result) {
                        text += `Title : ${x.title}\n`
                        text += `Views : ${x.views}\n`
                        text += `Published : ${x.published}\n`
                        text += `Thumbnail : ${x.thumbnail}\n`
                        text += `Link : https://www.youtube.com/watch?v=${x.videoId}\n\n`
                    }
                    m.reply(text)
                })
                .catch(console.error)
            break
        case 'xytmp3':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytaudio2?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`)
                .then(({ data }) => {
                    var caption = `❖ Title    : *${data.result.title}*\n`
                    caption += `❖ Size     : *${data.result.size}*`
                    conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
                        conn.sendMessage(m.chat, { audio: { url: data.result.link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
                    })
                })
                .catch(console.error)
            break
        case 'xytmp4':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
            axios
                .get(`https://api.lolhuman.xyz/api/ytvideo2?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`)
                .then(({ data }) => {
                    var caption = `❖ Title    : *${data.result.title}*\n`
                    caption += `❖ Size     : *${data.result.size}*`
                    conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
                        conn.sendMessage(m.chat, { audio: { url: data.result.link }, mimetype: 'video/mp4', fileName: `${data.result.title}.mp4` })
                    })
                })
                .catch(console.error)
            break
        case 'xtelesticker':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://t.me/addstickers/LINE_Menhera_chan_ENG`)
            axios.get(`https://api.lolhuman.xyz/api/telestick?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`).then(({ data }) => {
                conn.sendMessage(m.chat, { sticker: { url: data.result.sticker.random() } })
            })
            break
        case 'xtiktoknowm':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
            axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`).then(({ data }) => {
                conn.sendMessage(m.chat, { video: { url: data.result.link }, mimetype: 'video/mp4' })
            })
            break
        case 'xtiktokmusic':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
            conn.sendMessage(m.chat, { audio: { url: `https://api.lolhuman.xyz/api/tiktokmusic?apikey=9b817532fadff8fc7cb86862&url=${args[0]}` }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3`, ptt: true })
            break
        case 'xspotify':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://open.spotify.com/track/0ZEYRVISCaqz5yamWZWzaA`)
            axios.get(`https://api.lolhuman.xyz/api/spotify?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`).then(({ data }) => {
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
        case 'xspotifysearch':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Melukis Senja`)
            axios.get(`https://api.lolhuman.xyz/api/spotifysearch?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                var text = ''
                for (var x of data.result) {
                    text += `Title : ${x.title}\n`
                    text += `Artists : ${x.artists}\n`
                    text += `Duration : ${x.duration}\n`
                    text += `Link : ${x.link}\n`
                    text += `Preview : ${x.preview_url}\n\n\n`
                }
                m.reply(text)
            })
            break
        case 'xjooxplay':
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
        case 'xigdl':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
            axios.get(`https://api.lolhuman.xyz/api/instagram?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`).then(({ data }) => {
                var url = data.result
                if (url.includes('.mp4')) {
                    conn.sendMessage(m.chat, { video: { url }, mimetype: 'video/mp4' })
                } else {
                    conn.sendMessage(m.chat, { image: { url } })
                }
            })
            break
        case 'xigdl2':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
            axios.get(`https://api.lolhuman.xyz/api/instagram2?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`).then(({ data }) => {
                for (var x of data.result) {
                    if (x.includes('.mp4')) {
                        conn.sendMessage(m.chat, { video: { url: x }, mimetype: 'video/mp4' })
                    } else {
                        conn.sendMessage(m.chat, { image: { url: x } })
                    }
                }
            })
            break
        case 'xtwtdl':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`)
            axios.get(`https://api.lolhuman.xyz/api/twitter?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`).then(({ data }) => {
                conn.sendMessage(m.chat, { video: { url: data.result.link[data.result.link.length - 1].link }, mimetype: 'video/mp4' })
            })
            break
        case 'xfbdl':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`)
            axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`).then(({ data }) => {
                conn.sendMessage(m.chat, { video: { url: data.result }, mimetype: 'video/mp4' })
            })
            break
        case 'xzippyshare':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://www51.zippyshare.com/v/5W0TOBz1/file.html`)
            axios.get(`https://api.lolhuman.xyz/api/zippyshare?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`).then(({ data }) => {
                var text = `File Name : ${data.result.name_file}\n`
                text += `Size : ${data.result.size}\n`
                text += `Date Upload : ${data.result.date_upload}\n`
                text += `Download Url : ${data.result.download_url}`
                m.reply(text)
            })
            break
        case 'xpinterest':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/pinterest?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                conn.sendMessage(m.chat, { image: { url: data.result } })
            })
            break
        case 'xpinterest2':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/pinterest2?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                for (var x of data.result.slice(0, 5)) {
                    conn.sendMessage(m.chat, { image: { url: x } })
                }
            })
            break
        case 'xpinterestdl':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://id.pinterest.com/pin/696580267364426905/`)
            axios.get(`https://api.lolhuman.xyz/api/pinterestdl?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`).then(({ data }) => {
                conn.sendMessage(m.chat, { image: { url: data.result[0] } })
            })
            break
        case 'xpixiv':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/pixiv?apikey=9b817532fadff8fc7cb86862&query=${text}` } })
            break
        case 'xpixivdl':
            if (!text) return m.reply(`Example: ${usedPrefix + command} 63456028`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/pixivdl/${args[0]}?apikey=9b817532fadff8fc7cb86862` } })
            break

        // AniManga //
        case 'xcharacter':
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
        case 'xmanga':
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
        case 'xanime':
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
        case 'xwait':
            if (!isImage && !isQuotedImage) return m.reply(`Kirim gambar dengan caption ${usedPrefix + command} atau tag gambar yang sudah dikirim`)
            var form = new FormData()
            form.append('img', stream, 'tahu.jpg')
            axios.post(`https://api.lolhuman.xyz/api/wait?apikey=9b817532fadff8fc7cb86862`, form).then(({ data }) => {
                var caption = `Anilist id : ${data.result.anilist_id}\n`
                caption += `MAL id : ${data.result.mal_id}\n`
                caption += `Title Romaji : ${data.result.title_romaji}\n`
                caption += `Title Native : ${data.result.title_native}\n`
                caption += `Title English : ${data.result.title_english}\n`
                caption += `at : ${data.result.at}\n`
                caption += `Episode : ${data.result.episode}\n`
                caption += `Similarity : ${data.result.similarity}`
                conn.sendMessage(m.chat, { video: { url: data.result.video }, mimetype: 'video/mp4', caption })
            })
            break
        case 'xkusonime':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://kusonime.com/nanatsu-no-taizai-bd-batch-subtitle-indonesia/`)
            axios.get(`https://api.lolhuman.xyz/api/kusonime?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`).then(({ data }) => {
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
        case 'xkusonimesearch':
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
        case 'xotakudesu':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://otakudesu.tv/lengkap/pslcns-sub-indo/`)
            axios.get(`https://api.lolhuman.xyz/api/otakudesu?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`).then(({ data }) => {
                var text = `Title : ${data.result.title}\n`
                text += `Japanese : ${data.result.japanese}\n`
                text += `Judul : ${data.result.judul}\n`
                text += `Type : ${data.result.type}\n`
                text += `Episode : ${data.result.episodes}\n`
                text += `Aired : ${data.result.aired}\n`
                text += `Producers : ${data.result.producers}\n`
                text += `Genre : ${data.result.genres}\n`
                text += `Duration : ${data.result.duration}\n`
                text += `Studios : ${data.result.status}\n`
                text += `Rating : ${data.result.rating}\n`
                text += `Credit : ${data.result.credit}\n`
                for (var x in data.result.link_dl) {
                    text += `\n\n*${data.result.link_dl[x].title}*\n`
                    for (var y in data.result.link_dl[x].link_dl) {
                        ini_info = data.result.link_dl[x].link_dl[y]
                        text += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`
                        text += `\`\`\`Size : \`\`\`${ini_info.size}\n`
                        text += `\`\`\`Link : \`\`\`\n`
                        down_link = ini_info.link_dl
                        for (var z in down_link) {
                            text += `${z} - ${down_link[z]}\n`
                        }
                    }
                }
                m.reply(text)
            })
            break
        case 'xotakudesusearch':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Gotoubun No Hanayome`)
            axios.get(`https://api.lolhuman.xyz/api/otakudesusearch?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                var text = `Title : ${data.result.title}\n`
                text += `Japanese : ${data.result.japanese}\n`
                text += `Judul : ${data.result.judul}\n`
                text += `Type : ${data.result.type}\n`
                text += `Episode : ${data.result.episodes}\n`
                text += `Aired : ${data.result.aired}\n`
                text += `Producers : ${data.result.producers}\n`
                text += `Genre : ${data.result.genres}\n`
                text += `Duration : ${data.result.duration}\n`
                text += `Studios : ${data.result.status}\n`
                text += `Rating : ${data.result.rating}\n`
                text += `Credit : ${data.result.credit}\n`
                for (var x in data.result.link_dl) {
                    text += `\n\n*${data.result.link_dl[x].title}*\n`
                    for (var y in data.result.link_dl[x].link_dl) {
                        var info = data.result.link_dl[x].link_dl[y]
                        text += `\n\`\`\`Reso : \`\`\`${info.reso}\n`
                        text += `\`\`\`Size : \`\`\`${info.size}\n`
                        text += `\`\`\`Link : \`\`\`\n`
                        var link = info.link_dl
                        for (var z in link) {
                            text += `${z} - ${link[z]}\n`
                        }
                    }
                }
                m.reply(text)
            })
            break

        // Information //
        case 'xkbbi':
            if (!text) return m.reply(`Example: ${usedPrefix + command} kursi`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/kbbi?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var text = `\`\`\`Kata : ${data.result[0].nama}\`\`\`\n`
            text += `\`\`\`Kata Dasar : ${data.result[0].kata_dasar}\`\`\`\n`
            text += `\`\`\`Pelafalan : ${data.result[0].pelafalan}\`\`\`\n`
            text += `\`\`\`Bentuk Tidak Baku : ${data.result[0].bentuk_tidak_baku}\`\`\`\n\n`
            for (var x of data.result) {
                text += `\`\`\`Kode : ${x.makna[0].kelas[0].kode}\`\`\`\n`
                text += `\`\`\`Kelas : ${x.makna[0].kelas[0].nama}\`\`\`\n`
                text += `\`\`\`Artinya : \n${x.makna[0].kelas[0].deskripsi}\`\`\`\n\n`
                text += `\`\`\`Makna Lain : \n${x.makna[0].submakna}\`\`\`\n `
                text += `\`\`\`Contoh Kalimat : \n${x.makna[0].contoh}\`\`\`\n`
            }
            m.reply(text)
            break
        case 'xbrainly':
            if (!text) return m.reply(`Example: ${usedPrefix + command} siapakah sukarno`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/brainly?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var text = 'Beberapa Pembahasan Dari Brainly :\n\n'
            for (var x of data.result) {
                text += `==============================\n`
                text += `\`\`\`Pertanyaan :\`\`\`\n${x.question.content}\n\n`
                text += `\`\`\`Jawaban :\`\`\`\n${x.answer[0].content}\n`
                text += `==============================\n\n`
            }
            m.reply(text)
            break
        case 'xjarak':
            if (!text) return m.reply(`Example: ${usedPrefix + command} jakarta - yogyakarta`)
            var text1 = text.split('-')[0].trim()
            var text2 = text.split('-')[1].trim()
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jaraktempuh?apikey=9b817532fadff8fc7cb86862&kota1=${text1}&kota2=${text2}`)
            var text = `Informasi Jarak dari ${text1} ke ${text2} :\n\n`
            text += `\`\`\`◪ Asal :\`\`\` ${data.result.from.name}\n`
            text += `\`\`\`◪ Garis Lintang :\`\`\` ${data.result.from.latitude}\n`
            text += `\`\`\`◪ Garis Bujur :\`\`\` ${data.result.from.longitude}\n\n`
            text += `\`\`\`◪ Tujuan :\`\`\` ${data.result.to.name}\n`
            text += `\`\`\`◪ Garis Lintang :\`\`\` ${data.result.to.latitude}\n`
            text += `\`\`\`◪ Garis Bujur :\`\`\` ${data.result.to.longitude}\n\n`
            text += `\`\`\`◪ Jarak Tempuh :\`\`\` ${data.result.jarak}\n`
            text += `\`\`\`◪ Waktu Tempuh :\`\`\`\n`
            text += `   ╭───────────────❏\n`
            text += `❍┤ Kereta Api : ${data.result.kereta_api}\n`
            text += `❍┤ Pesawat : ${data.result.pesawat}\n`
            text += `❍┤ Mobil : ${data.result.mobil}\n`
            text += `❍┤ Motor : ${data.result.motor}\n`
            text += `❍┤ Jalan Kaki : ${data.result.jalan_kaki}\n`
            text += `   ╰───────────────❏\n`
            m.reply(text)
            break
        case 'xurbandictionary':
            var { data } = await axios.get(`http://lolhuman.herokuapp.com/api/urdict?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            for (var x of data.result) {
                var text = `\`\`\`Meaning :\n${x.definition}\`\`\`\n\n`
                text += `\`\`\`Link : ${x.permalink}\`\`\`\n\n`
                text += `\`\`\`Sounds Url : ${x.sound_urls[0]}\`\`\`\n\n`
                text += `\`\`\`Like : ${x.thumbs_up}\`\`\`\n\n`
                text += `\`\`\`Dislike : ${x.thumbs_down}\`\`\`\n\n`
                text += `\`\`\`Created On : \n${x.written_on}\`\`\`\n\n`
                text += `\`\`\`Author : ${x.author}\`\`\`\n\n`
                text += `\`\`\`Word : ${x.word}\`\`\`\n\n`
                text += `\`\`\`Defined Id : ${x.defid}\`\`\`\n\n`
                text += `\`\`\`Example : ${x.example}\`\`\`\n\n`
            }
            m.reply(text)
            break
        case 'xchord':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Melukis senja`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/chord?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var text = `Title : ${data.result.title}\n`
            text += `Chord : \n${data.result.chord}`
            m.reply(text)
            break
        case 'xheroml':
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
        case 'xmlstalk':
            if (!text) return m.reply(`Example: ${usedPrefix + command} 84830127/2169`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/mobilelegend/${args[0]}?apikey=9b817532fadff8fc7cb86862`)
            m.reply(data.result)
            break
        case 'xgenshin':
            if (!text) return m.reply(`Example: ${usedPrefix + command} jean`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/genshin/${text}?apikey=9b817532fadff8fc7cb86862`)
            var caption = `Name : ${data.result.title}\n`
            caption += `Intro : ${data.result.intro}\n`
            caption += `Icon : ${data.result.icon}\n`
            await conn.sendMessage(m.chat, { image: { url: data.result.cover1 }, caption })
            await conn.sendMessage(m.chat, { audio: { url: data.result.cv[0].audio[0] }, mimetype: 'audio/mp4' })
            break
        case 'xqrreader':
            if (!isImage && !isQuotedImage) return m.reply(`Kirim gambar dengan caption ${usedPrefix + command} atau tag gambar yang sudah dikirim`)
            var form = new FormData()
            form.append('img', stream, { filename: 'tahu.jpg' })
            var { data } = await axios.post(`https://api.lolhuman.xyz/api/read-qr?apikey=9b817532fadff8fc7cb86862`, form)
            m.reply('Result: ' + data.result)
            break
        case 'xwikipedia':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Tahu`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/wiki?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            m.reply(data.result)
            break
        case 'xtranslate':
            if (!text) return m.reply(`Example: ${usedPrefix + command} en Tahu Bacem`)
            var kode_negara = args[0]
            args.shift()
            var text = args.join(' ')
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/translate/auto/${kode_negara}?apikey=9b817532fadff8fc7cb86862&text=${text}`)
            init_txt = `From : ${data.result.from}\n`
            init_txt += `To : ${data.result.to}\n`
            init_txt += `Original : ${data.result.original}\n`
            init_txt += `Translated : ${data.result.translated}\n`
            init_txt += `Pronunciation : ${data.result.pronunciation}\n`
            m.reply(init_txt)
            break
        case 'xbrainly':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Soekarno adalah`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/brainly?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var text = 'Result : \n'
            for (var x of data.result) {
                text += `${x.title}\n`
                text += `${x.url}\n\n`
            }
            m.reply(text)
            break
        case 'xjadwaltv':
            if (!text) return m.reply(`Example: ${usedPrefix + command} RCTI`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jadwaltv/${args[0]}?apikey=9b817532fadff8fc7cb86862`)
            var text = `Jadwal TV ${args[0].toUpperCase()}\n`
            for (var x in data.result) {
                text += `${x} - ${data.result[x]}\n`
            }
            m.reply(text)
            break
        case 'xjadwaltvnow':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jadwaltv/now?apikey=9b817532fadff8fc7cb86862`)
            var text = `Jadwal TV Now :\n`
            for (var x in data.result) {
                text += `${x.toUpperCase()}${data.result[x]}\n\n`
            }
            m.reply(text)
            break
        case 'xnewsinfo':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/newsinfo?apikey=9b817532fadff8fc7cb86862`)
            var text = 'Result :\n'
            for (var x of data.result) {
                text += `Title : ${x.title}\n`
                text += `Author : ${x.author}\n`
                text += `Source : ${x.source.name}\n`
                text += `Url : ${x.url}\n`
                text += `Published : ${x.publishedAt}\n`
                text += `Description : ${x.description}\n\n`
            }
            m.reply(text)
            break
        case 'xcnnindonesia':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia?apikey=9b817532fadff8fc7cb86862`)
            var text = 'Result :\n'
            for (var x of data.result) {
                text += `Judul : ${x.judul}\n`
                text += `Link : ${x.link}\n`
                text += `Tipe : ${x.tipe}\n`
                text += `Published : ${x.waktu}\n\n`
            }
            m.reply(text)
            break
        case 'xcnnnasional':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia/nasional?apikey=9b817532fadff8fc7cb86862`)
            var text = 'Result :\n'
            for (var x of data.result) {
                text += `Judul : ${x.judul}\n`
                text += `Link : ${x.link}\n`
                text += `Tipe : ${x.tipe}\n`
                text += `Published : ${x.waktu}\n\n`
            }
            m.reply(text)
            break
        case 'xcnninternasional':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia/internasional?apikey=9b817532fadff8fc7cb86862`)
            var text = 'Result :\n'
            for (var x of data.result) {
                text += `Judul : ${x.judul}\n`
                text += `Link : ${x.link}\n`
                text += `Tipe : ${x.tipe}\n`
                text += `Published : ${x.waktu}\n\n`
            }
            m.reply(text)
            break
        case 'xinfogempa':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/infogempa?apikey=9b817532fadff8fc7cb86862`)
            var caption = `Lokasi : ${data.result.lokasi}\n`
            caption += `Waktu : ${data.result.waktu}\n`
            caption += `Potensi : ${data.result.potensi}\n`
            caption += `Magnitude : ${data.result.magnitude}\n`
            caption += `Kedalaman : ${data.result.kedalaman}\n`
            caption += `Koordinat : ${data.result.koordinat}`
            conn.sendMessage(m.chat, { image: { url: data.result.map }, caption })
            break
        case 'xlirik':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Melukis Senja`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/lirik?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            m.reply(data.result)
            break
        case 'xcuaca':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Yogyakarta`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cuaca/${args[0]}?apikey=9b817532fadff8fc7cb86862`)
            var text = `Tempat : ${data.result.tempat}\n`
            text += `Cuaca : ${data.result.cuaca}\n`
            text += `Angin : ${data.result.angin}\n`
            text += `Description : ${data.result.description}\n`
            text += `Kelembapan : ${data.result.kelembapan}\n`
            text += `Suhu : ${data.result.suhu}\n`
            text += `Udara : ${data.result.udara}\n`
            text += `Permukaan laut : ${data.result.permukaan_laut}\n`
            conn.sendMessage(m.chat, { location: { degreesLatitude: data.result.latitude, degreesLongitude: data.result.longitude } })
            m.reply(text)
            break
        case 'xcovidindo':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/corona/indonesia?apikey=9b817532fadff8fc7cb86862`)
            var text = `Positif : ${data.result.positif}\n`
            text += `Sembuh : ${data.result.sembuh}\n`
            text += `Dirawat : ${data.result.dirawat}\n`
            text += `Meninggal : ${data.result.meninggal}`
            m.reply(text)
            break
        case 'xcovidglobal':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/corona/global?apikey=9b817532fadff8fc7cb86862`)
            var text = `Positif : ${data.result.positif}\n`
            text += `Sembuh : ${data.result.sembuh}\n`
            text += `Dirawat : ${data.result.dirawat}\n`
            text += `Meninggal : ${data.result.meninggal}`
            m.reply(text)
            break
        case 'xkodepos':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Slemanan or ${usedPrefix + command} 66154`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/kodepos?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var text = `Provinsi : ${data.result[0].province}\n`
            text += `Kabupaten : ${data.result[0].city}\n`
            text += `Kecamatan : ${data.result[0].subdistrict}\n`
            text += `Kelurahan : ${data.result[0].urban}\n`
            text += `Kode Pos : ${data.result[0].postalcode}`
            m.reply(text)
            break
        case 'xjadwalbola':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/jadwalbola?apikey=9b817532fadff8fc7cb86862`)
            var text = 'Jadwal Bola :\n'
            for (var x of data.result) {
                text += `Hari : ${x.hari}\n`
                text += `Jam : ${x.jam}\n`
                text += `Event : ${x.event}\n`
                text += `Match : ${x.match}\n`
                text += `TV : ${x.tv}\n\n`
            }
            m.reply(text)
            break
        case 'xindbeasiswa':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/indbeasiswa?apikey=9b817532fadff8fc7cb86862`)
            var text = 'Info Beasiswa :\n'
            for (var x of data.result) {
                text += `Title : ${x.title}\n`
                text += `Link : ${x.link}\n\n`
            }
            m.reply(text)
            break
        case 'xhoax':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/turnbackhoax?apikey=9b817532fadff8fc7cb86862`)
            var text = 'Info Hoax :\n'
            for (var x of data.result) {
                text += `Title : ${x.title}\n`
                text += `Link : ${x.link}\n`
                text += `Posted : ${x.posted}\n`
                text += `Description : ${x.desc}\n\n`
            }
            m.reply(text)
            break
        case 'xnsfwcheck':
            if (!isImage && !isQuotedImage) return m.reply(`Kirim gambar dengan caption ${usedPrefix + command} atau tag gambar yang sudah dikirim`)
            var form = new FormData()
            form.append('img', stream, { filename: 'tahu.jpg' })
            var { data } = await axios.post(`https://api.lolhuman.xyz/api/nsfwcheck?apikey=9b817532fadff8fc7cb86862`, form)
            var is_nsfw = 'No'
            if (Number(data.result.replace('%', '')) >= 50) {
                is_nsfw = 'Yes'
            }
            m.reply(`Is NSFW? ${is_nsfw}\nNSFW Score : ${data.result}`)
            break
        case 'xocr':
            if (!isImage && !isQuotedImage) return m.reply(`Kirim gambar dengan caption ${usedPrefix + command} atau tag gambar yang sudah dikirim`)
            var form = new FormData()
            form.append('img', stream, { filename: 'tahu.jpg' })
            var { data } = await axios.post(`https://api.lolhuman.xyz/api/ocr?apikey=9b817532fadff8fc7cb86862`, form)
            m.reply(`Result : ${data.result}`)
            break

        // Movie & Story
        case 'xlk21':
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
        case 'xdrakorongoing':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/drakorongoing?apikey=9b817532fadff8fc7cb86862`)
            var text = 'Ongoing Drakor\n\n'
            for (var x of data.result) {
                text += `Title : ${x.title}\n`
                text += `Link : ${x.link}\n`
                text += `Thumbnail : ${x.thumbnail}\n`
                text += `Year : ${x.category}\n`
                text += `Total Episode : ${x.total_episode}\n`
                text += `Genre : ${x.genre.join(', ')}\n\n`
            }
            m.reply(text)
            break
        case 'xwattpad':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://www.wattpad.com/707367860-kumpulan-quote-tere-liye-tere-liye-quote-quote`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/wattpad?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`)
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
        case 'xwattpadsearch':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Tere Liye`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/wattpadsearch?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var text = 'Wattpad Seach : \n'
            for (var x of data.result) {
                text += `Title : ${x.title}\n`
                text += `Url : ${x.url}\n`
                text += `Part : ${x.parts}\n`
                text += `Motify date : ${x.modifyDate}\n`
                text += `Create date: ${x.createDate}\n`
                text += `Coment count: ${x.commentCount}\n\n`
            }
            m.reply(text)
            break
        case 'xcerpen':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/cerpen?apikey=9b817532fadff8fc7cb86862`)
            var text = `Title : ${data.result.title}\n`
            text += `Creator : ${data.result.creator}\n`
            text += `Story :\n${data.result.cerpen}`
            m.reply(text)
            break
        case 'xceritahoror':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/ceritahoror?apikey=9b817532fadff8fc7cb86862`)
            var caption = `Title : ${data.result.title}\n`
            caption += `Desc : ${data.result.desc}\n`
            caption += `Story :\n${data.result.story}\n`
            conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption })
            break

        // Searching
        case 'xgimage':
        case 'xkonachan':
        case 'xwallpapersearch':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            if (command === 'wallpapersearch') {
                command = 'wallpaper'
            }
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/${command.slice(1)}?apikey=9b817532fadff8fc7cb86862&query=${text}` } })
            break
        case 'xgimage2':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/gimage2?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                for (var x of data.result.slice(0, 5)) {
                    conn.sendMessage(m.chat, { image: { url: x } })
                }
            })
            break
        case 'xwallpapersearch2':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            axios.get(`https://api.lolhuman.xyz/api/wallpaper2?apikey=9b817532fadff8fc7cb86862&query=${text}`).then(({ data }) => {
                conn.sendMessage(m.chat, { image: { url: data.result } })
            })
            break
        case 'xplaystore':
            if (!text) return m.reply(`Example: ${usedPrefix + command} telegram`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/playstore?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var text = 'Play Store Search : \n'
            for (var x of data.result) {
                text += `Name : ${x.title}\n`
                text += `ID : ${x.appId}\n`
                text += `Developer : ${x.developer}\n`
                text += `Link : ${x.url}\n`
                text += `Price : ${x.priceText}\n`
                text += `Price : ${x.price}\n\n`
            }
            m.reply(text)
            break
        case 'xshopee':
            if (!text) return m.reply(`Example: ${usedPrefix + command} tas gendong`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/shopee?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var text = 'Shopee Search : \n'
            for (var x of data.result) {
                text += `Name : ${x.name}\n`
                text += `Terjual : ${x.sold}\n`
                text += `Stock : ${x.stock}\n`
                text += `Lokasi : ${x.shop_loc}\n`
                text += `Link : ${x.link_produk}\n\n`
            }
            m.reply(text)
            break
        case 'xgoogle':
            if (!text) return m.reply(`Example: ${usedPrefix + command} loli kawaii`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/gsearch?apikey=9b817532fadff8fc7cb86862&query=${text}`)
            var text = 'Google Search : \n'
            for (var x of data.result) {
                text += `Title : ${x.title}\n`
                text += `Link : ${x.link}\n`
                text += `Desc : ${x.desc}\n\n`
            }
            m.reply(text)
            break

        // Random Text //
        case 'xquotes':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/quotes?apikey=9b817532fadff8fc7cb86862`)
            m.reply(`_${data.result.quote}_\n\n*― ${data.result.by}*`)
            break
        case 'xquotesanime':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/quotesnime?apikey=9b817532fadff8fc7cb86862`)
            m.reply(`_${data.result.quote}_\n\n*― ${data.result.character}*\n*― ${data.result.anime} ${data.result.episode}*`)
            break
        case 'xquotesdilan':
            quotedilan = await axios.get(`https://api.lolhuman.xyz/api/quotes/dilan?apikey=9b817532fadff8fc7cb86862`)
            m.reply(quotedilan.result)
            break
        case 'xfaktaunik':
        case 'xkatabijak':
        case 'xpantun':
        case 'xbucin':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/${command.slice(1)}?apikey=9b817532fadff8fc7cb86862`)
            m.reply(data.result)
            break
        case 'xrandomnama':
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/random/nama?apikey=9b817532fadff8fc7cb86862`)
            m.reply(data.result)
            break

        // Entertainment
        case 'xasupan':
            axios.get(`https://api.lolhuman.xyz/api/asupan?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                conn.sendMessage(m.chat, { video: { url: data.result }, mimetype: 'video/mp4' })
            })
            break
        case 'xwancak':
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/onecak?apikey=9b817532fadff8fc7cb86862` } })
            break

        // Primbon
        case 'xartinama':
            if (!text) return m.reply(`Example: ${usedPrefix + command} LoL Human`)
            axios.get(`https://api.lolhuman.xyz/api/artinama?apikey=9b817532fadff8fc7cb86862&nama=${text}`).then(({ data }) => {
                m.reply(data.result)
            })
            break
        case 'xjodoh':
            if (!text) return m.reply(`Example: ${usedPrefix + command} Tahu & Bacem`)
            axios.get(`https://api.lolhuman.xyz/api/jodoh/${text.split('&')[0]}/${text.split('&')[1]}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                var text = `Positif : ${data.result.positif}\n`
                text += `Negative : ${data.result.negatif}\n`
                text += `Deskripsi : ${data.result.deskripsi}`
                m.reply(text)
            })
            break
        case 'xweton':
            if (!text) return m.reply(`Example: ${usedPrefix + command} 12 12 2020`)
            axios.get(`https://api.lolhuman.xyz/api/weton/${args[0]}/${args[1]}/${args[2]}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                var text = `Weton : ${data.result.weton}\n`
                text += `Pekerjaan : ${data.result.pekerjaan}\n`
                text += `Rejeki : ${data.result.rejeki}\n`
                text += `Jodoh : ${data.result.jodoh}`
                m.reply(text)
            })
            break
        case 'xjadian':
            if (!text) return m.reply(`Example: ${usedPrefix + command} 12 12 2020`)
            axios.get(`https://api.lolhuman.xyz/api/jadian/${args[0]}/${args[1]}/${args[2]}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                var text = `Karakteristik : ${data.result.karakteristik}\n`
                text += `Deskripsi : ${data.result.deskripsi}`
                m.reply(text)
            })
            break
        case 'xtebakumur':
            if (!text) return m.reply(`Example: ${usedPrefix + command} LoL Human`)
            axios.get(`https://api.lolhuman.xyz/api/tebakumur?apikey=9b817532fadff8fc7cb86862&name=${text}`).then(({ data }) => {
                var text = `Nama : ${data.result.name}\n`
                text += `Umur : ${data.result.age}`
                m.reply(text)
            })
            break

        case 'x1977':
        case 'xaden':
        case 'xbrannan':
        case 'xbrooklyn':
        case 'xclarendon':
        case 'xgingham':
        case 'xhudson':
        case 'xinkwell':
        case 'xearlybird':
        case 'xkelvin':
        case 'xlark':
        case 'xlofi':
        case 'xmaven':
        case 'xmayfair':
        case 'xmoon':
        case 'xnashville':
        case 'xperpetua':
        case 'xreyes':
        case 'xrise':
        case 'xslumber':
        case 'xstinson':
        case 'xtoaster':
        case 'xvalencia':
        case 'xwalden':
        case 'xwillow':
        case 'xxpro2':
        case 'xpencil':
        case 'xquotemaker3':
        case 'xroundsticker':
        case 'xstickerwm':
            if (!isImage && !isQuotedImage) return m.reply(`Kirim gambar dengan caption ${usedPrefix + command} atau tag gambar yang sudah dikirim`)
            var url = `https://api.lolhuman.xyz/api/filter/${command.slice(1)}?apikey=9b817532fadff8fc7cb86862`
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
        case 'xsticker':
        case 'xs':
            if (!(isImage && isQuotedImage && isVideo && isQuotedVideo)) return m.reply(`Kirim media dengan caption ${usedPrefix + command} atau tag media yang sudah dikirim`)
            var stream = await downloadContentFromMessage(msg.message[mediaType], mediaType.replace('Message', ''))
            let stickerStream = new PassThrough()
            if (isImage || isQuotedImage) {
                ffmpeg(stream)
                    .on('start', function (cmd) {
                        console.log(`Started : ${cmd}`)
                    })
                    .on('error', function (err) {
                        console.log(`Error : ${err}`)
                    })
                    .on('end', function () {
                        console.log('Finish')
                    })
                    .addOutputOptions([
                        `-vcodec`,
                        `libwebp`,
                        `-vf`,
                        `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
                    ])
                    .toFormat('webp')
                    .writeToStream(stickerStream)
                conn.sendMessage(m.chat, { sticker: { stream: stickerStream } })
            } else if (isVideo || isQuotedVideo) {
                ffmpeg(stream)
                    .on('start', function (cmd) {
                        console.log(`Started : ${cmd}`)
                    })
                    .on('error', function (err) {
                        console.log(`Error : ${err}`)
                    })
                    .on('end', async () => {
                        conn.sendMessage(m.chat, { sticker: { url: `./temp/stickers/${sender}.webp` } }).then(() => {
                            fs.unlinkSync(`./temp/stickers/${sender}.webp`)
                            console.log('Finish')
                        })
                    })
                    .addOutputOptions([
                        `-vcodec`,
                        `libwebp`,
                        `-vf`,
                        `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
                    ])
                    .toFormat('webp')
                    .save(`./temp/stickers/${sender}.webp`)
            }
            break

        // Stalk
        case 'xstalkig':
            if (!text) return m.reply(`Example: ${usedPrefix + command} jessnolimit`)
            axios.get(`https://api.lolhuman.xyz/api/stalkig/${args[0]}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
                var caption = `Username : ${data.result.username}\n`
                caption += `Full Name : ${data.result.fullname}\n`
                caption += `Posts : ${data.result.posts}\n`
                caption += `Followers : ${data.result.followers}\n`
                caption += `Following : ${data.result.following}\n`
                caption += `Bio : ${data.result.bio}`
                conn.sendMessage(m.chat, { image: { url: data.result.photo_profile }, caption })
            })
            break
        case 'xstalkgithub':
            if (!text) return m.reply(`Example: ${usedPrefix + command} LoL-Human`)
            axios.get(`https://api.lolhuman.xyz/api/github/${args[0]}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
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
        case 'xstalktwitter':
            if (!text) return m.reply(`Example: ${usedPrefix + command} jokowi`)
            axios.get(`https://api.lolhuman.xyz/api/twitter/${args[0]}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
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
        case 'xstalktiktok':
            if (!text) return m.reply(`Example: ${usedPrefix + command} bulansutena`)
            axios.get(`https://api.lolhuman.xyz/api/stalktiktok/${args[0]}?apikey=9b817532fadff8fc7cb86862`).then(({ data }) => {
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
        case 'xssweb':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://api.lolhuman.xyz`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/ssweb?apikey=9b817532fadff8fc7cb86862&url=${args[0]}` } })
            break
        case 'xssweb2':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://api.lolhuman.xyz`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/sswebfull?apikey=9b817532fadff8fc7cb86862&url=${args[0]}` } })
            break
        case 'xshortlink':
            if (!text) return m.reply(`Example: ${usedPrefix + command} https://api.lolhuman.xyz`)
            axios.get(`https://api.lolhuman.xyz/api/ouoshortlink?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`).then(({ data }) => {
                m.reply(data.result)
            })
            break

        // Random Image //
        case 'xart':
        case 'xbts':
        case 'xexo':
        case 'xelf':
        case 'xloli':
        case 'xneko':
        case 'xwaifu':
        case 'xshota':
        case 'xhusbu':
        case 'xsagiri':
        case 'xshinobu':
        case 'xmegumin':
        case 'xwallnime':
        case 'xquotesimage':
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/random/${command.slice(1)}?apikey=9b817532fadff8fc7cb86862` } })
            break

        case 'xchiisaihentai':
        case 'xtrap':
        case 'xblowjob':
        case 'xyaoi':
        case 'xecchi':
        case 'xhentai':
        case 'xahegao':
        case 'xhololewd':
        case 'xsideoppai':
        case 'xanimefeets':
        case 'xanimebooty':
        case 'xanimethighss':
        case 'xhentaiparadise':
        case 'xanimearmpits':
        case 'xhentaifemdom':
        case 'xlewdanimegirls':
        case 'xbiganimetiddies':
        case 'xanimebellybutton':
        case 'xhentai4everyone':
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/random/nsfw/${command.slice(1)}?apikey=9b817532fadff8fc7cb86862` } })
            break

        case 'xbj':
        case 'xero':
        case 'xcum':
        case 'xfeet':
        case 'xyuri':
        case 'xtrap':
        case 'xlewd':
        case 'xfeed':
        case 'xeron':
        case 'xsolo':
        case 'xgasm':
        case 'xpoke':
        case 'xanal':
        case 'xholo':
        case 'xtits':
        case 'xkuni':
        case 'xkiss':
        case 'xerok':
        case 'xsmug':
        case 'xbaka':
        case 'xsolog':
        case 'xfeetg':
        case 'xlewdk':
        case 'xwaifu':
        case 'xpussy':
        case 'xfemdom':
        case 'xcuddle':
        case 'xhentai':
        case 'xeroyuri':
        case 'xcum_jpg':
        case 'xblowjob':
        case 'xerofeet':
        case 'xholoero':
        case 'xclassic':
        case 'xerokemo':
        case 'xfox_girl':
        case 'xfutanari':
        case 'xlewdkemo':
        case 'xwallpaper':
        case 'xpussy_jpg':
        case 'xkemonomimi':
        case 'xnsfw_avatar':
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/random2/${command.slice(1)}?apikey=9b817532fadff8fc7cb86862` } })
            break

        // Textprome //
        case 'xblackpink':
        case 'xneon':
        case 'xgreenneon':
        case 'xadvanceglow':
        case 'xfutureneon':
        case 'xsandwriting':
        case 'xsandsummer':
        case 'xsandengraved':
        case 'xmetaldark':
        case 'xneonlight':
        case 'xholographic':
        case 'xtext1917':
        case 'xminion':
        case 'xdeluxesilver':
        case 'xnewyearcard':
        case 'xbloodfrosted':
        case 'xhalloween':
        case 'xjokerlogo':
        case 'xfireworksparkle':
        case 'xnatureleaves':
        case 'xbokeh':
        case 'xtoxic':
        case 'xstrawberry':
        case 'xbox3d':
        case 'xroadwarning':
        case 'xbreakwall':
        case 'xicecold':
        case 'xluxury':
        case 'xcloud':
        case 'xsummersand':
        case 'xhorrorblood':
        case 'xthunder':
            if (!text) return m.reply(`Example: ${usedPrefix + command} LoL Human`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/textprome/${command.slice(1)}?apikey=9b817532fadff8fc7cb86862&text=${text}` } })
            break

        case 'xpornhub':
        case 'xglitch':
        case 'xavenger':
        case 'xspace':
        case 'xninjalogo':
        case 'xmarvelstudio':
        case 'xlionlogo':
        case 'xwolflogo':
        case 'xsteel3d':
        case 'xwallgravity':
            if (!text) return m.reply(`Example: ${usedPrefix + command} LoL Human`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/textprome2/${command.slice(1)}?apikey=9b817532fadff8fc7cb86862&text1=${args[0]}&text2=${args[1]}` } })
            break

        // Photo Oxy //
        case 'xshadow':
        case 'xcup':
        case 'xcup1':
        case 'xromance':
        case 'xsmoke':
        case 'xburnpaper':
        case 'xlovemessage':
        case 'xundergrass':
        case 'xlove':
        case 'xcoffe':
        case 'xwoodheart':
        case 'xwoodenboard':
        case 'xsummer3d':
        case 'xwolfmetal':
        case 'xnature3d':
        case 'xunderwater':
        case 'xgolderrose':
        case 'xsummernature':
        case 'xletterleaves':
        case 'xglowingneon':
        case 'xfallleaves':
        case 'xflamming':
        case 'xharrypotter':
        case 'xcarvedwood':
            if (!text) return m.reply(`Example: ${usedPrefix + command} LoL Human`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/photooxy1/${command.slice(1)}?apikey=9b817532fadff8fc7cb86862&text=${text}` } })
            break

        case 'xtiktok':
        case 'xarcade8bit':
        case 'xbattlefield4':
        case 'xpubg':
            if (!text) return m.reply(`Example: ${usedPrefix + command} LoL Human`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/photooxy2/${command.slice(1)}?apikey=9b817532fadff8fc7cb86862&text1=${args[0]}&text2=${args[1]}` } })
            break

        // Ephoto 360 //
        case 'xwetglass':
        case 'xmulticolor3d':
        case 'xwatercolor':
        case 'xluxurygold':
        case 'xgalaxywallpaper':
        case 'xlighttext':
        case 'xbeautifulflower':
        case 'xpuppycute':
        case 'xroyaltext':
        case 'xheartshaped':
        case 'xbirthdaycake':
        case 'xgalaxystyle':
        case 'xhologram3d':
        case 'xgreenneon':
        case 'xglossychrome':
        case 'xgreenbush':
        case 'xmetallogo':
        case 'xnoeltext':
        case 'xglittergold':
        case 'xtextcake':
        case 'xstarsnight':
        case 'xwooden3d':
        case 'xtextbyname':
        case 'xwritegalacy':
        case 'xgalaxybat':
        case 'xsnow3d':
        case 'xbirthdayday':
        case 'xgoldplaybutton':
        case 'xsilverplaybutton':
        case 'xfreefire':
            if (!text) return m.reply(`Example: ${usedPrefix + command} LoL Human`)
            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/ephoto1/${command.slice(1)}?apikey=9b817532fadff8fc7cb86862&text=${text}` } })
            break
            
}
}
export default handler