const assert = require('assert')

function wait(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

function triggerReactChange(elementSelector) {
  const event = new Event('change');
  document.querySelector(elementSelector).dispatchEvent(event);
}

module.exports = async (browser, takeScreenshot, baseUrl, log, capability) => {
  let url

  await browser.get(baseUrl)

  await wait(3000)

  url = await browser.url()
  assert(url === baseUrl + '/signin')

  await takeScreenshot('signin - blank')

  const emailInput = await browser.elementByCssSelector('#email')
  const passwordInput = await browser.elementByCssSelector('#password')

  await emailInput.type('user@vidiff.com'.split(''))
  await passwordInput.type('carrotcake'.split(''))

  // https://github.com/appium/appium/issues/9002
  if (capability.platformName === 'iOS') {
    browser.execute(`
      const event = new Event('change');
      document.querySelector('#email').dispatchEvent(event);
      document.querySelector('#password').dispatchEvent(event);
    `);
  }

  await takeScreenshot('signin - filled', 'We filled the inputs with valid data')

  const submitButton = await browser.elementByCssSelector('.Signin-submit')

  await submitButton.click()

  url = await browser.url()
  assert(url === baseUrl + '/')

  await wait(1000)

  await takeScreenshot('home')

  const aboutLink = await browser.elementByCssSelector('nav>ul>li:nth-child(2)>a')

  await aboutLink.click()

  url = await browser.url()
  assert(url === baseUrl + '/about')

  await takeScreenshot('about', 'The about page')

  const contentLink = await browser.elementByCssSelector('nav>ul>li:nth-child(3)>a')

  await contentLink.click()

  await wait(1000)

  url = await browser.url()
  assert(url === baseUrl + '/content')

  await takeScreenshot('content')
}
