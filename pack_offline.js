//pb is package-bundle
const nodeLocation = 'C:/Users/user/AppData/Roaming/npm/node_modules/'
const pb = require(nodeLocation  + 'package-bundle/bin/package-bundle.js')
const args = []
const options = {
  F: 'C:/Users/user/AppData/Roaming/npm/pack1.zip'
}

// cmd
// package-bundle request bluebird -F
// -F or --out-file <file> 
// npm cache add <folder>

const { spawn } = require('child_process');
const packageBundleBat = spawn('cmd.exe', ['/c', 'package-bundle', args, options]);

packageBundleBat.stdout.on('data', (data) => {
  console.log(data.toString());
});

packageBundleBat.stderr.on('data', (data) => {
  console.log(data.toString());
});

packageBundleBat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});