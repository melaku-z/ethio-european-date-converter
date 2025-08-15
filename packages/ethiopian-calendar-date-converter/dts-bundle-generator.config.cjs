// @ts-check

/* eslint-disable-next-line @typescript-eslint/no-require-imports */
const packageJson = require('./package.json')

const getPackageName = () => {
  return packageJson.name
}

/** @type import('dts-bundle-generator/config-schema').BundlerConfig */
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
