const puppeteer = require('puppeteer');
const data = require('./data.json');
const fs = require('fs');
var ks = require('node-key-sender');

ks.setOption('caseCorrection', false);
ks.setOption('globalDelayPressMillisec', 1);
ks.setOption('globalDelayBetweenMillisec', 1);
ks.setOption('startDelayMillisec', 1);

var accentsMap = {
    'ã': '@514 a',
    'ẽ': '@514 e',
    'ĩ': '@514 i',
    'õ': '@514 o',
    'ũ': '@514 u',
    'Ã': '@514 A',
    'Ẽ': '@514 E',
    'Ĩ': '@514 I',
    'Õ': '@514 O',
    'Ũ': '@514 U',
    'â': 'shift-@514 a',
    'ê': 'shift-@514 e',
    'î': 'shift-@514 i',
    'ô': 'shift-@514 o',
    'û': 'shift-@514 u',
    'Â': 'shift-@514 A',
    'Ê': 'shift-@514 E',
    'Î': 'shift-@514 I',
    'Ô': 'shift-@514 O',
    'Û': 'shift-@514 U',
    'à': 'shift-@192 a',
    'è': 'shift-@192 e',
    'ì': 'shift-@192 i',
    'ò': 'shift-@192 o',
    'ù': 'shift-@192 u',
    'À': 'shift-@192 A',
    'È': 'shift-@192 E',
    'Ì': 'shift-@192 I',
    'Ò': 'shift-@192 O',
    'Ù': 'shift-@192 U',
    'á': '@192 a',
    'é': '@192 e',
    'í': '@192 i',
    'ó': '@192 o',
    'ú': '@192 u',
    'Á': '@192 A',
    'É': '@192 E',
    'Í': '@192 I',
    'Ó': '@192 O',
    'Ú': '@192 U',
    'ç': '@192 c',
    'Ç': '@192 C',
    'ä': 'shift-@54 a',
    'ë': 'shift-@54 e',
    'ï': 'shift-@54 i',
    'ö': 'shift-@54 o',
    'ü': 'shift-@54 u',
    'Ä': 'shift-@54 A',
    'Ë': 'shift-@54 E',
    'Ï': 'shift-@54 I',
    'Ö': 'shift-@54 O',
    'Ü': 'shift-@54 O'
};

ks.aggregateKeyboardLayout(accentsMap);

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

// datas
var date = "", convocation = "";

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3641.0 Safari/537.36');
        await page.goto('https://web.whatsapp.com');
        await page.waitForSelector("._25pwu");
        await page.waitForSelector(".ldL67");
        // connected to Whatsapp...
        page.click('span[title="Groupe Arbitres Juniors D"]');
        // go to the Junior chat
        while (1) {
            await page.waitForSelector('strong');
            const text = await page.evaluate(() => Array.from(document.querySelectorAll('strong'), element => element.textContent));
            convocation = text[text.length - 1];

            // comparing
            // 1. Find date
            date = convocation.substr((convocation.indexOf('.') - 2), 5)
            if (!data.date.includes(date)) {
                data.place.forEach(e => {
                    if (convocation.toLowerCase().includes(e)) {
                        (async function type() {
                            // 2. Writing text
                            ks.sendText((e).toString());
                        })();
                        console.log(e)
                    }
                });
            }
            sleep(1000)
        }        
    }
    catch (err) {
        console.log(err);
    }
})();
