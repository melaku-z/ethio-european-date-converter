/* eslint-disable-next-line @typescript-eslint/no-require-imports */
const packageJson = require('./package.json')

const getPackageName = () => {
  return packageJson.name
}

const config = {
  entries: [
    {
      filePath: './src/ethiopianCalendarDateConverter.ts',
      outFile: `./dist/${getPackageName()}.d.ts`,
      noCheck: false,
    },
  ],
}

module.exports = config
