const puppeteer = require('puppeteer');

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}



const Play = async (page) => {
  await delay(1000);
  await page.$$eval("a", as => as.find(a => a.innerText.includes("Enter a typing race")).click());
  await delay(2000);
  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll('table tbody tr td div div span[unselectable]'))
    return tds.map(span => span.textContent)
  });

  await delay(12500);
  const textField = await page.$('input[class=txtInput]');
  await textField.type(data.join(""),{ delay: 20 });
  await textField.dispose();

}

async function run() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 900});
    await page.goto('http://play.typeracer.com/');
    await Play(page);
  }

run();