const run = require('promise-path').run
const read = require('promise-path').read
const write = require('promise-path').write

const config = require('./package.json')

const makeDirectory = () => run('mkdir build')
const copyImageAssets = () => run('cp -r src/assets/images build/')
const copyJavaScript = () => run('cp -r src/js build/')
const copyHTML = () => run('cp -r src/*.html build/')
const report = () => console.log('Build complete')
const startWebServer = () => require('./start')
const errors = (ex) => console.error('Unable to build', ex)

const replaceGameTitle = (contents) => contents.replace('{{GAME_TITLE}}', config.name)

function replaceStrings() {
    return read('build/game.html', 'utf8')
        .then(replaceGameTitle)
        .then((contents) => write('build/game.html', contents, 'utf8'))
}

run('rm -rf build')
    .then(makeDirectory)
    .then(copyImageAssets)
    .then(copyJavaScript)
    .then(copyHTML)
    .then(replaceStrings)
    .then(report)
    .then(startWebServer)
    .catch(errors)
