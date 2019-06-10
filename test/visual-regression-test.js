const assert = require('assert')

module.exports = async (baseUrl, takeScreenshot, browser) => {
  let url

  await browser.url(baseUrl + '/')

  url = await browser.getUrl()
  assert(url === baseUrl + '/signin')

  await takeScreenshot('signin - blank')

  const emailInput = await browser.$('#email')
  const passwordInput = await browser.$('#password')

  await emailInput.setValue('user@vidiff.com')
  await passwordInput.setValue('carrotcake')

  await takeScreenshot('signin - filled', 'We filled the inputs with valid data')

  const submitButton = await browser.$('.Signin-submit')

  await submitButton.click()

  url = await browser.getUrl()
  assert(url === baseUrl + '/')

  await takeScreenshot('home')

  const aboutLink = await browser.$('nav>ul>li:nth-child(2)>a')

  await aboutLink.click()

  url = await browser.getUrl()
  assert(url === baseUrl + '/about')

  await takeScreenshot('about', 'The about page')

  const contentLink = await browser.$('nav>ul>li:nth-child(3)>a')

  await contentLink.click()

  url = await browser.getUrl()
  assert(url === baseUrl + '/content-changed')

  const elephantImage = await browser.$('#elephant')

  await elephantImage.scrollIntoView()

  await takeScreenshot('content changed')
}
