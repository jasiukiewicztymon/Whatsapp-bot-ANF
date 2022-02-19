const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3641.0 Safari/537.36');
    await page.goto('https://web.whatsapp.com');
    await page.waitForSelector("._25pwu");
    await page.waitForSelector(".ldL67");
    //connected to Whatsapp...
    page.click('span[title="Groupe Arbitres Juniors D"]');
    await page.waitForSelector('strong')
    const text = await page.evaluate(() => Array.from(document.querySelectorAll('strong'), element => element.textContent));
    console.log(text[text.length - 1])
})();
