/** this code is protected by the GNU General Public License v3.0
 * 
 * this code is a part of the project "MCPL"
 * you can find the project on github: https://github.com/flamebousteur/mcpl
 */

var [isNode,isWeb]=[(typeof module!=="undefined"&&typeof module.exports!=="undefined"),(typeof window!=="undefined"&&typeof window.document!=="undefined")];

if (isNode) { const fs = require('node:fs') }
else if (isWeb) {}
else throw new Error("MCPL: can't detect environment (nodeJS or web)");

class compiler {
	constructor (text) { this.text = text; }

	static fromFile (file) { if (isNode) new compiler(fs.readFileSync(file, 'utf8')); else throw new Error("MCPL: can't use fromFile() in web environment"); }
	toFile (file) { fs.writeFileSync(file, this.compiled, 'utf8'); }

	static parseCommand (command) {
		// get the command: '#' and command name can be separated by any number of spaces
		let a = substring(1).trim().split(' ')
		let commandName = a[0];
		// get the arguments arguement string can be separated by any number of spaces (0 to) (a argument is a string between '' or "")
		let argsR = []; // arguments result
		let args = a.slice(1).join(' ');
		let arg = '';
		let inString = false;
		for (let i = 0; i < args.length; i++) {
			let char = args[i];
			if (char == '"' || char == "'") {
				if (inString) {
					argsR.push(arg);
					arg = '';
					inString = false;
				} else {
					inString = true;
				}
			} else {
				arg += char;
			}
		}
		return [commandName, ...argsR];
	}

	compile () {
		let lines = this.text.split('\n');
		let compiled = [];
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i].trim(); // remove spaces
			if (!line.startsWith('#')) continue; // not a preprocessor line
		}
		this.compiled = compiled.join('\n');
	}
}

if (isNode) module.exports = compiler;
else if (isWeb) window.MCPL = { compiler };