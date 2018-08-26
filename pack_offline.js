//pb is package-bundle
const nodeLocation = 'C:/Users/user/AppData/Roaming/npm/node_modules/'
const pb = require(nodeLocation  + 'package-bundle/bin/package-bundle.js')
var args = ["bootstrap", "jquery"]
var options = {
  // F: "C:/Users/user/AppData/Roaming/npm/pack1.zip"
}
process.argv = args
pb()
// cmd
// package-bundle request bluebird -F
// -F or --out-file <file> 
// npm cache add <folder>