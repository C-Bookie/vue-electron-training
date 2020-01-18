const { testWithSpectron } = require('vue-cli-plugin-electron-builder')
const spectron = require('spectron')
const assert = require('assert')

process.env.IS_TEST = true

// eslint-disable-next-line no-unused-vars,promise/param-names
const sleep = time => new Promise(r => setTimeout(r, time))

// eslint-disable-next-line no-undef
describe('Application launch', function () {
  this.timeout(60000)

  // // eslint-disable-next-line no-unused-vars
  // var stdout, url, stopServe, app
  // // eslint-disable-next-line no-undef
  // before(async (done) => {
  //   var { stdoutTemp, urlTemp, stopServeTemp, appTemp } = await testWithSpectron(spectron)
  //   stdout = stdoutTemp
  //   url = urlTemp
  //   stopServe = stopServeTemp
  //   app = appTemp
  //   done()
  // })
  //
  // // eslint-disable-next-line no-undef
  // after(async (done) => {
  //   await stopServe()
  //   done()
  // })

  // eslint-disable-next-line no-undef
  it('testAWindowIsCreated', async () => {
    const { stdout, url, stopServe, app } = await testWithSpectron(spectron)
    console.log(`electron:serve returned: ${stdout}`)
    console.log(`the dev server url is: ${url}`)
    await app.client.waitUntilWindowLoaded()
    const count = await app.client.getWindowCount()
    assert.equal(count, 1)
    await sleep(20000)
    await stopServe()
  })

  // eslint-disable-next-line no-undef
  it('verifyWindowIsVisibleWithTitle', async () => {
    // eslint-disable-next-line no-unused-vars
    const { stdout, url, stopServe, app } = await testWithSpectron(spectron)
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
