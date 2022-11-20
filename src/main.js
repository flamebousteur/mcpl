var [isNode,isWeb]=[(typeof module!=="undefined"&&typeof module.exports!=="undefined"),(typeof window!=="undefined"&&typeof window.document!=="undefined")];

if (isNode) { const compiler = require("./compiler"); }
else if (isWeb) { var compiler = MCPL.compiler; }
else throw new Error("MCPL: can't detect environment (nodeJS or web)");

console.log(compiler.parseCommand('#define a "b" c "a a"'));