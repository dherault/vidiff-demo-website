const assert = require('assert')

function wait(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

module.exports = async (browser, takeScreenshot, baseUrl, log) => {
  let url

  log('Using the log function')
  log(process.env)

  await browser.get(baseUrl + '/')

  await wait(1500)

  url = await browser.url()
  assert(url === baseUrl + '/signin')

  await takeScreenshot('signin - blank')

  const emailInput = await browser.elementByCssSelector('#email')
  const passwordInput = await browser.elementByCssSelector('#password')

  await emailInput.type('user@vidiff.com'.split(''))
  await passwordInput.type('carrotcake'.split(''))

  await takeScreenshot('signin - filled', 'We filled the inputs with valid data')

  const submitButton = await browser.elementByCssSelector('.Signin-submit')

  await submitButton.click()

  url = await browser.url()
  assert(url === baseUrl + '/')

  await takeScreenshot('home')

  const aboutLink = await browser.elementByCssSelector('nav>ul>li:nth-child(2)>a')

  await aboutLink.click()

  url = await browser.url()
  assert(url === baseUrl + '/about')

  await takeScreenshot('about', 'The about page')

  const contentLink = await browser.elementByCssSelector('nav>ul>li:nth-child(3)>a')

  await contentLink.click()

  url = await browser.url()
  assert(url === baseUrl + '/content-changed')

  await takeScreenshot('content changed')
}
