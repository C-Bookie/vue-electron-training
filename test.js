const { testWithSpectron } = require('vue-cli-plugin-electron-builder')
const spectron = require('spectron')
const assert = require('assert')

const sleep = time => new Promise(r => setTimeout(r, time));

describe('Application launch', function () {
  this.timeout(30000)

  it('testAWindowIsCreated', async () => {
    const {stdout, url, stopServe, app} = await testWithSpectron(spectron)
    console.log(`electron:serve returned: ${stdout}`)
    console.log(`the dev server url is: ${url}`)
    await app.client.waitUntilWindowLoaded()
    const count = await app.client.getWindowCount()
    assert.equal(count, 1)
    await sleep(20000)
    await stopServe()
  })

  it('verifyWindowIsVisibleWithTitle', async () => {
    const {stdout, url, stopServe, app} = await testWithSpectron(spectron)
    try {
      const isVisible = await app.browserWindow.isVisible()
      assert.strictEqual(isVisible, true)
      const title = await app.client.getTitle()
      assert.strictEqual(title, 'tee-test')
    } catch (error) {
      console.error('Test failed', error.message)
    }
    await stopServe()
  })
})
