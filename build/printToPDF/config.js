require('shelljs/global')

const cSavePdfPath = './dist/pdf/'

rm('-rf', cSavePdfPath)
mkdir('-p', cSavePdfPath)

module.exports = {
  targetWebsite: 'http://localhost:4000/#/home/index',
  targetOrigin: 'http://localhost:4000',
  savePdfPath: cSavePdfPath
}