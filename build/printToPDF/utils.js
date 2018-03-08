const chalk = require('chalk')

const typeList = {
  success: chalk.green,
  error: chalk.bold.red,
  warning: chalk.keyword('orange')
}

let util = {},
    $config = null

util.setConfig = (config) => {
  $config = config
}

util.printWithColor = (str, type = '', color = 'white') => {
  let colorFunc = typeList[type] || chalk[color]
  console.log(colorFunc(str))
}


util.launchLogin = async(page) => {
  try {
    await page.goto('http://localhost:4000/#/login')

    await page.type('#id', '3009333', { delay: 20 })
    await page.type('#id', '123456', { delay: 20 })

    let loginBtn = await page.$('[name=commit]')
    await loginBtn.click({delay: 20})

    await page.waitFor(600)
    return Promise.resolve(1)
  } catch (error) {
    return Promise.resolve(0)
  }
}

util.isLoadingFinished = (page) => {
  return page.evaluate(() => {
    return document.readyState === 'complete'
  })
}

util.executePrintToPdf = async(page) => {
  if (await util.isLoadingFinished(page)) {
    await page.waitFor(1000)
    let pageTitle = await page.title()
    await page.pdf({path: `${$config.savePdfPath}${pageTitle}.pdf`})
    console.log(chalk.magenta(`Pages that have been printed in PDF format is: ${pageTitle}`))
    setTimeout(() => {
      page.close()
    }, 1000)
  } else {
    setTimeout(() => {
      util.executePrintToPdf(page)
    }, 100)
  }
}

util.waitForTimeout = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(true)
      } catch (e) {
        reject(false)
      }
    }, delay)
  })
}

//在页面没加载完成前轮询，知道渲染完成，超时时间为30000ms
util.waitForReadyStateComplete = (page, timesLimit = 600, cycleFactor = 10) => {
  return new Promise(async (resolve, reject) => {
    let i = 0
    while (i < timesLimit) {
      util.printWithColor(`♻️  Waiting for the page to load，Now the number of polling is: ${i}`, '')
      if (await util.isLoadingFinished(page)) {
        util.printWithColor(` Okay, The time spent loading the page is: ${i * cycleFactor} ms`, 'success')
        return resolve(true)
      }
      i++
      await page.waitFor(cycleFactor)
    }
    util.printWithColor('✘ Error: Timeout: max 30000ms ', 'warning')
    return resolve(false)
  })
}

module.exports = util
