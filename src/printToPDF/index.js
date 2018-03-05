const puppeteer = require('puppeteer');
const chalk = require('chalk')

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.setViewport({ width: 1024, height: 2048 })

  await page.goto('http://wusihe.com', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'river.pdf', format: 'A4'});

  console.log(chalk.green('  Build failed with errors.\n'))

  await browser.close();
})();