function preprocessor (data = "", {
	comments = true, // remove comments
	preprocessor=  true, // execute preprocessor commands
	emptyLines = true, // remove empty lines
	trim = true, // trim lines
	loglevel = 2, // 0: no log, 1: errors, 2: warnings, 3: info, 4: debug
	onError = () => {}, // function to call when an error occurs
	onWarning = () => {}, // function to call when a warning occurs
	onInfo = () => {}, // function to call when an info occurs
	onDebug = () => {}, // function to call when a debug occurs
	onEvent = () => {}, // function to call when an event occurs
} = {}) {
	function log (level, message) {
		if (loglevel >= level) {
			if (level == 1) {
				onError(message);
				console.error(message);
			} else if (level == 2) {
				onWarning(message);
				console.warn(message);
			} else if (level == 3) {
				onInfo(message);
				console.info(message);
			} else if (level == 4) {
				onDebug(message);
				console.debug(message);
			}
		};
		onEvent({
			type: "log",
			level,
			message,
		});
	}
	log(4, "preprocessor: starting");
	let lines = data.split("\n");
	let result = [];
	let inString = false;
	let stringChar = "";
	let inComment = false;
	let pos = [0, 0]; // line, column

	// delete comments (// and /* */) if not in string
	if (comments) {
		log(4, "preprocessor: deleting comments");
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];
			let newLine = "";
			for (let j = 0; j < line.length; j++) {
				let char = line[j];
				if (inString) {
					if (char == stringChar) inString = false;
					newLine += char;
				} else {
					if (char == '"' || char == "'") { // start of string
						inString = true;
						stringChar = char;
						newLine += char;
					} else if (char == "/" && line[j + 1] == "/") break;
					else if (char == "/" && line[j + 1] == "*") {
						inComment = true;
						j++;
					} else if (char == "*" && line[j + 1] == "/") {
						inComment = false;
						j++;
					} else if (!inComment) newLine += char;
				}
			}
			console.log(newLine);
			lines[i] = newLine;
		}
	}

	// preprocessor commands
	if (preprocessor) {
		log(4, "preprocessor: executing preprocessor commands");
		let inPreprocessor = false;
		let preprocessorCommand = "";
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];
			let newLine = "";
			for (let j = 0; j < line.length; j++) {
				let char = line[j];
				if (inString) {
					if (char == stringChar) inString = false;
					newLine += char;
				} else {
					if (char == '"' || char == "'") {
						inString = true;
						stringChar = char;
						newLine += char;
					} else if (char == "#" && !inPreprocessor) {
						inPreprocessor = true;
					} else if (char == " " && inPreprocessor) {
						inPreprocessor = false;
						preprocessorCommand = "";
					}
					if (inPreprocessor) preprocessorCommand += char;
					else newLine += char;
				}
			}
			lines[i] = newLine;

			if (preprocessorCommand != "") {}
		}
	}

	// delete empty lines
	if (emptyLines) {
		log(4, "preprocessor: deleting empty lines");
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];
			if (line.trim() != "") result.push(line);
		}
	} else result = lines;

	// trim lines
	if (trim) {
		log(4, "preprocessor: trimming lines");
		for (let i = 0; i < result.length; i++) {
			result[i] = result[i].trim();
		}
	}

	log(4, "preprocessor: finished");
	return result.join("\n");
}

var data = `
// comment
# include 'file.txt'
/* comment
# include 'file.txt'
*/
# define NAME 'value'
# define NAME "value"

a
"a//"
zaezre
"/*
a
*/"

// a */

/* //
// */
*/
ezre
`;

console.log(preprocessor(data));