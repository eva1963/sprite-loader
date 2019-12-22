#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { runLoaders  } = require('loader-runner');

if (process.argv.length < 4) {
  usage();
  process.exit(1);
}

const cwd = process.cwd();

const loaders = process.argv.slice(2, process.argv.length - 1)
  .map(loader => ({
    name: loader,
    path: path.join(cwd, 'node_modules', loader)
  }))
const file = process.argv[process.argv.length - 1]

loaders.forEach(loader => {
  try {
    require(loader.path)
  } catch (e) {
    console.warn(`There was a problem loading ${loader.name}`);
    console.warn(e);
    process.exit(1);
  }
})

if (!fs.existsSync(file)) {
  console.warn(`File ${file} does not exist`);
    process.exit(1);
}

runLoaders({
  resource: path.join(cwd, file),
  loaders: loaders.map(loader => loader.path),
  readResource: fs.readFile.bind(fs),
  context: {
    options: {}
  }
}, (err, result) => {
  if (err) {
    console.warn(err);
    return;
  }
  console.log(result.result[0].toString());
})

function usage() {
  console.log('Usage: run-loader loader1 loader2 ... loaderN file');
}
