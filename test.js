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
        page.click('span[title="Test"]');
        // go to the Junior chat
        while (1) {
            try {
                await page.waitForSelector('strong');
                const text = await page.evaluate(() => Array.from(document.querySelectorAll('strong')[document.querySelectorAll('strong').length - 1].parentElement.querySelectorAll('strong'), element => element.textContent));
                for (var j = 0; j < text.length; j++) {
                    convocation = text[j];
                    // comparing
                    // 1. Find date
                    date = convocation.substr((convocation.indexOf('.') - 2), 5)
                    if (!data.date.includes(date)) {
                        for (var i = 0; i < data.place.length; i++) {
                            e = data.place[i];
                            if (convocation.toLowerCase().includes(e)) {
                                (async function type() {
                                    // 2. Writing text
                                    var res = date + " " + e + ", " + data.name + " dispo"
                                    for (var i = 0; i < res.length; i++) {
                                        page.keyboard.press(res[i]);
                                    }
                                    // 3. Sending message
                                    page.keyboard.press('Enter');
                                    // 4. Adding date to json data file
                                    data.date.push(date);
                                    fs.writeFile('./data.json', JSON.stringify(data), function writeJSON(err) {
                                        if (err) return console.log(err);
                                    });
                                })();
                                break;
                            }
                        }
                    }
                }
                sleep(1000)
            }
            catch {}
        }        
    }
    catch (err) {
        console.log(err);
    }
})();
