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
var date = "", convocation = "", res = "", ok = false;

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3641.0 Safari/537.36');
        await page.goto('https://web.whatsapp.com');
        await page.waitForSelector("._1AHcd");
        // connected to Whatsapp...
        page.click('span[title="Groupe Arbitres Juniors D"]');
        // go to the Junior chat

        sleep(5000);

        while (1) {
            try {
                await page.waitForSelector('strong');
                const text = await page.evaluate(() => Array.from(document.querySelectorAll('strong')[document.querySelectorAll('strong').length - 1].parentElement.querySelectorAll('strong'), element => element.textContent));

                while (text.length != 0) {
                    convocation = text[text.length - 1];
                    text.pop()
                    date = convocation.substring((convocation.indexOf('.') - 2), (convocation.indexOf('.') - 2) + 5)

                    if (!data.date.includes(date)) {
                        for (var i = 0; i < data.place.length; i++) {
                            e = data.place[i];
                            if (convocation.toLowerCase().includes(e)) {
                                (async function type() {
                                    res = date + " " + e + ", ";

                                    for (var j = 0; j < res.length; j++) {
                                        page.keyboard.press(res[j]);
                                        ok = true;
                                    }

                                    page.keyboard.down('Shift')
                                    page.keyboard.press('Enter')
                                    page.keyboard.up('Shift')

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
                if (ok) {
                    res = data.name + " dispo";
                    for (var j = 0; j < res.length; j++) {
                        page.keyboard.press(res[j]);
                    }

                    await page.waitForSelector('#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._2xy_p._3XKXx > button > span');
                    page.click("#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._2xy_p._3XKXx > button > span")
                    ok = false;
                }
            }
            catch (e) {
                console.log(e)
            }
        }        
    }
    catch (err) {
        console.log(err);
    }
})();
