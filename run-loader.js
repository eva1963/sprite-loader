const { runLoaders } = require("loader-runner");
const path = require("path");
const fs = require("fs");

runLoaders({
    resource: path.join(__dirname, "./loaders/index.css"),
    loaders: [path.join(__dirname, "./loaders/sprite-loader.js")],
    readResource: fs.readFile.bind(fs)
}, (err, result) => {
    err ? console.error(err) : console.log(result);
})