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
var date = "", convocation = "", res = "";

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
                    date = convocation.substr((convocation.indexOf('.') - 2), 5)
                    if (!data.date.includes(date)) {
                        for (var i = 0; i < data.place.length; i++) {
                            e = data.place[i];
                            if (convocation.toLowerCase().includes(e)) {
                                (async function type() {
                                    res = date + " " + e + ", " + data.name + " dispo" 

                                    for (var j = 0; j < res.length; j++) {
                                        page.keyboard.press(res[j]);
                                    }

                                    try {
                                        page.click("span[data-testid='send']")
                                    }
                                    catch {}

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
            }
            catch {}
        }        
    }
    catch (err) {
        console.log(err);
    }
})();
