const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
const execSync = require('child_process').execSync
const exec = require('child_process').exec

const iconv = require('iconv-lite')
const robot = require("robotjs")

const token = '407594915:AAEPjLrzQC00egjzfqyOSFDRmZIac3yUb9E'
const YA_API_KEY = 'AQVN3Juv_9jA6r16EGC1QoDvTxu3EGhiShjy-tlm'



//console.log(cmd);



const bot = new TelegramBot(token, {
    polling: true
})


bot.on('voice', (msg) => {

    const stream = bot.getFileStream(msg.voice.file_id)
    let chunks = []
    
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('end', ()=>{

        const axiosConfig = {
            method: 'POST',
            url: 'https://stt.api.cloud.yandex.net/speech/v1/stt:recognize',
            headers: {
                Authorization: 'Api-Key ' + YA_API_KEY
            },
            data: Buffer.concat(chunks)
        }
        
        axios(axiosConfig).then(res=> {
            console.log(res.data.result)

            if (res.data.result.toLowerCase() === 'закрой хром') {
                const chrome = execSync('tasklist /FI "IMAGENAME eq chrome.exe')
                let isChrome = iconv.decode(chrome, 'cp866').trim()
                if (isChrome !== 'Информация: Задачи, отвечающие заданным критериям, отсутствуют.') {
                    const killChrome = execSync('taskkill /F /IM chrome.exe', {stdio: 'ignore'})
                }
                bot.sendMessage(msg.chat.id, 'Хром закрыт!')
            }

            if (res.data.result.toLowerCase() === 'закрой яндекс') {
                const yandex = execSync('tasklist /FI "IMAGENAME eq browser.exe')
                let isYandex = iconv.decode(yandex, 'cp866').trim()     
                if (isYandex !== 'Информация: Задачи, отвечающие заданным критериям, отсутствуют.') {
                    const killYandex = execSync('taskkill /F /IM browser.exe', {stdio: 'ignore'})
                }
                bot.sendMessage(msg.chat.id, 'Яндекс браузер закрыт!')
            }

            if (res.data.result.toLowerCase() === 'закрой оперу') {
                const opera = execSync('tasklist /FI "IMAGENAME eq opera.exe')
                let isOpera = iconv.decode(opera, 'cp866').trim()
                if (isOpera !== 'Информация: Задачи, отвечающие заданным критериям, отсутствуют.') {
                    const killOpera = execSync('taskkill /F /IM opera.exe', {stdio: 'ignore'})
                }
                bot.sendMessage(msg.chat.id, 'Опера закрыта!')
            }


            if (res.data.result.toLowerCase() === 'закрой все браузеры') {
                const chrome = execSync('tasklist /FI "IMAGENAME eq chrome.exe')
                const yandex = execSync('tasklist /FI "IMAGENAME eq browser.exe')
                const opera = execSync('tasklist /FI "IMAGENAME eq opera.exe')

                let isChrome = iconv.decode(chrome, 'cp866').trim()
                let isYandex = iconv.decode(yandex, 'cp866').trim()     
                let isOpera = iconv.decode(opera, 'cp866').trim()
                
                if (isChrome !== 'Информация: Задачи, отвечающие заданным критериям, отсутствуют.') {
                    const killChrome = execSync('taskkill /F /IM chrome.exe', {stdio: 'ignore'})
                }

                if (isYandex !== 'Информация: Задачи, отвечающие заданным критериям, отсутствуют.') {
                    const killYandex = execSync('taskkill /F /IM browser.exe', {stdio: 'ignore'})
                }

                if (isOpera !== 'Информация: Задачи, отвечающие заданным критериям, отсутствуют.') {
                    const killOpera = execSync('taskkill /F /IM opera.exe', {stdio: 'ignore'})
                }

                bot.sendMessage(msg.chat.id, 'Все браузеры закрыты!')
            }

            if (res.data.result.toLowerCase() === 'пауза' || res.data.result.toLowerCase() === 'пробел' || res.data.result.toLowerCase() === 'воспроизвести'){
                robot.keyTap("space")
            }

            if (res.data.result.toLowerCase() === 'закрой доту') {
                const dota = execSync('tasklist /FI "IMAGENAME eq dota2.exe')
                let isDota = iconv.decode(dota, 'cp866').trim()
                if (isDota !== 'Информация: Задачи, отвечающие заданным критериям, отсутствуют.') {
                    const killDota = execSync('taskkill /F /IM dota2.exe', {stdio: 'ignore'})
                }
                bot.sendMessage(msg.chat.id, 'Дота закрыта!')
            }

            if (res.data.result.toLowerCase() === 'открой доту') {
                const dota = execSync('tasklist /FI "IMAGENAME eq dota2.exe')
                let isDota = iconv.decode(dota, 'cp866').trim()
                if (isDota === 'Информация: Задачи, отвечающие заданным критериям, отсутствуют.') {
                    exec('dota2', {cwd: `D:/Steam Games/steamapps/common/dota 2 beta/game/bin/win64`},  (err, stdout, stderr) => {
                       // console.log(stdout);
                        if (err) console.log(err);
                })
                }
                bot.sendMessage(msg.chat.id, 'Дота открыта!')
            }

            
        })

    })
})