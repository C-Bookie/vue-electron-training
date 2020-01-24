const { testWithSpectron } = require('vue-cli-plugin-electron-builder')
const spectron = require('spectron')
const assert = require('assert')

process.env.IS_TEST = true

// eslint-disable-next-line no-unused-vars,promise/param-names
const sleep = time => new Promise(r => setTimeout(r, time))

// eslint-disable-next-line no-undef
describe('Application launch', function () {
  this.timeout(35000)

  var activeSpectron
  // eslint-disable-next-line no-undef
  before(async (resolve, reject) => {
    activeSpectron = await testWithSpectron(spectron).then(resolve).catch(reject)
  })

  // eslint-disable-next-line no-undef
  after(() => {
    activeSpectron.stopServe()
  })

  // eslint-disable-next-line no-undef
  it('testAWindowIsCreated', async (done) => {
    console.log(`electron:serve returned: ${activeSpectron.stdout}`)
    console.log(`the dev server url is: ${activeSpectron.url}`)
    await activeSpectron.app.client.waitUntilWindowLoaded()
    const count = await activeSpectron.app.client.getWindowCount()
    assert.equal(count, 1)
    // await sleep(20000)
    done()
  })

  // eslint-disable-next-line no-undef
  it('verifyWindowIsVisibleWithTitle', async (done) => {
    try {
      const isVisible = await activeSpectron.app.browserWindow.isVisible()
      assert.strictEqual(isVisible, true)
      const title = await activeSpectron.app.client.getTitle()
      assert.strictEqual(title, 'tee-test')
    } catch (error) {
      console.error('Test failed', error.message)
    }
    done()
  })
})
