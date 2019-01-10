const { find, read, run, write } = require('promise-path')
const runStep = (command) => {
  console.log('[Build] Running ', command)
  return run(command)
}

const config = require('./package.json')

const apply = (f) => {
  console.log('[Apply]', f)
  return l => l.map(f)
}
const makeDirectory = () => runStep('mkdir build')
const copyFiles = (file) => runStep(`cp ${file} build`)
const copyImageAssets = () => runStep('cp -r src/assets/images build/')
const copyJavaScript = () => runStep('cp -r src/js build/')
const findHTML = () => find('src/*.html')
const report = () => console.log('[Build] Build complete')
const errors = (ex) => console.error('[Build] Unable to build', ex)
const startWebServer = () => require('./start')

const replaceGameTitle = (contents) => contents.replace(/{{GAME.TITLE}}/g, config.gamebase.title)
const replaceColors = (contents) => contents.replace(/{{GAME.COLOR.PRIMARY}}/g, config.gamebase.colors.primary)

function replaceStrings (filepath) {
  console.log('Replacing strings in', filepath)
  return read(filepath, 'utf8')
    .then(replaceGameTitle)
    .then(replaceColors)
    .then(contents => write(filepath.replace('src', 'build'), contents, 'utf8'))
}

run('rm -rf build')
  .then(makeDirectory)
  .then(copyImageAssets)
  .then(copyJavaScript)
  .then(findHTML)
  .then(apply(replaceStrings))
  .then(report)
  .then(startWebServer)
  .catch(errors)
