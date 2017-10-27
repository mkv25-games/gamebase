const path = require('path')
const { find, read, run, write } = require('promise-path')
const runStep = (command) => {
  console.log('[Build] Running ', command)
  return run(command)
}

const config = require('./package.json')

const apply = f => l => l.map(f)
const makeDirectory = () => runStep('mkdir build')
const copyFiles = (file) => runStep(`cp ${file} build`)
const copyImageAssets = () => runStep('cp -r src/assets/images build/')
const copyJavaScript = () => runStep('cp -r src/js build/')
const copyHTML = () => find('src/*.html').then(apply(copyFiles))
const findHTML = () => find('build/*.html')
const report = () => console.log('[Build] Build complete')
const errors = (ex) => console.error('[Build] Unable to build', ex)
const startWebServer = () => require('./start')

const replaceGameTitle = (contents) => contents.replace(/{{GAME_TITLE}}/g, config.gamebase.title)


function replaceStrings(filepath) {
  return read(filepath, 'utf8')
    .then(replaceGameTitle)
    .then(contents => write(filepath, contents, 'utf8'))
}

run('rm -rf build')
  .then(makeDirectory)
  .then(copyImageAssets)
  .then(copyJavaScript)
  .then(copyHTML)
  .then(findHTML)
  .then(apply(replaceStrings))
  .then(report)
  .then(startWebServer)
  .catch(errors)
