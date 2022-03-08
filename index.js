const puppeteer = require('puppeteer');
const data = require('./data.json');
const fs = require('fs');

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

async function type(e) {
    await page.evaluate(() => { document.querySelector('._2vbn4').click(); });
    await page.$eval('._2vbn4', el => el.value = (date + ", " + data.name + " dispo " + e).toString());
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
                        console.log(e)
                    }
                });
            }
            sleep(100)
        }        
    }
    catch (err) {
        console.log(err);
    }
})();
