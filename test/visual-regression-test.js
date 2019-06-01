const assert = require('assert')

module.exports = async (baseUrl, browser, takeScreenshot) => {
  let url

  await browser.url(baseUrl + '/')

  url = await browser.getUrl()
  assert(url === baseUrl + '/signin')

  await takeScreenshot('signin - blank')

  const emailInput = await browser.$('#email')
  const passwordInput = await browser.$('#password')

  await emailInput.setValue('user@vidiff.com')
  await passwordInput.setValue('carrotcake')

  await takeScreenshot('signin - filled')

  const submitButton = await browser.$('.Signin-submit')

  await submitButton.click()

  url = await browser.getUrl()
  assert(url === baseUrl + '/')

  await takeScreenshot('home')

  const aboutLink = await browser.$('nav>ul>li:nth-child(2)>a')

  await aboutLink.click()

  url = await browser.getUrl()
  assert(url === baseUrl + '/about')

  await takeScreenshot('about')
}
