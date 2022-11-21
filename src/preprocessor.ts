class preprocessor {
    text:string = '';
    option: Object[] = [];
    /*
    option = [
        {
            prefix: '#', // trimed line start by '#' character
            key: "include", // key word for call the directive
            type: "replaced",
            args: [
                {
                    name: "NAME",
                    types: ["string"], // the first type is a string
                    surrounds: [ // if not define surround by space
                        "'", // start and end with "'" character
                        "\"", // start and end with '"' character
                        "<>" // start "<" and end ">" characters
                    ]
                }
            ]
            func: function (parms, pos) {
                // parms:Object = {<name>:<value>} (from args Array in option Object)
                // pos:Number = <line> the line of the directive
                if (parms.NAME != null) return getFileContent(parms.NAME) // return string to set at the place of the directive
                else throw new Error("Fatal: file define")
            }
        },
        {
            prefix: '#',
            key: "define",
            type: "define"
            args: [
                {
                    name: "NAME",
                    types: ["string"],
                },
                {
                    name: "VALUE",
                    types: ["string"],
                }
            ]
        }
    ]
    */

    constructor (text, option) {
        this.text = text;
        this.option = option;
    }
}