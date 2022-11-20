const fs = require('fs');

class compiler {
    text: string;
    compiled: string;

    constructor (text: string) { this.text = text; }

    static fromFile (file: string) { new compiler(fs.readFileSync(file, 'utf8')); }
    toFile (file: string) { fs.writeFileSync(file, this.compiled, 'utf8'); }

    compile () {}
}

module.exports = compiler;