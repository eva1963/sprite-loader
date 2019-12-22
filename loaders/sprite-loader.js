const path = require("path");
const fs = require("fs");
const Spritesmith = require("spritesmith");

const regGlobal = /url\((\S*)\?__sprite/g;
const reg = /url\((\S*)\?__sprite/;
module.exports = function (source) {
    const callback = this.async();
    const imgs = source.match(regGlobal);

    let imgAry = [];
    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i].match(reg)[1];
        imgAry.push(path.join(__dirname, img));
    }

    Spritesmith.run({
        src: imgAry
    }, (err, result) => {
        fs.writeFileSync(path.join(process.cwd(),'dist/sprite.jpg'),result.image);
        source = source.replace(regGlobal, (match) => {
            return `url("dist/sprite.jpg"`;
        })
        fs.writeFileSync(path.join(process.cwd(),"dist/index.css"), source);
            callback(null, source);
    })
}