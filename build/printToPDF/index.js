const puppeteer = require('puppeteer')
const util = require('./util.js')
const $config = require('./config.js')

util.setConfig($config)

const reportUrl = ''

puppeteer.launch({ headless: true }).then(async browser => {
  let page = await browser.newPage()
  page.setViewport({ width: 1024, height: 2048 })

  page
  .waitForSelector('img')
  .then(async() => {
    login(browser, reportUrl)
  })

})


const printPageToPdf = async (browser, source) => {
  page = await browser.newPage()
  page.goto(source)
  await util.waitForReadyStateComplete(page)
  util.executePrintToPdf(page)
}

const login = async (browser, source) => {

  let loginOra = ora('Start logging ...')
  loginOra.start()
  let page = await browser.newPage()
  await util.launchLogin(page)
  loginOra.stop()
  util.printWithColor(`✔ Okay, login.`, 'success')

  await util.waitForTimeout(2 * 1000)
  printPageToPdf(browser, source)

}