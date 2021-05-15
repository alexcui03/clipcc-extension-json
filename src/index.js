const ClipCC = require('clipcc-extension');

class JsonExtension extends ClipCC.Extension {
    get(json, key) {
        let parsedObject = JSON.parse(json);
        const parsedParam = key.split('.');
        for (const param of parsedParam) {
            parsedObject = parsedObject[param];
        }
        return JSON.stringify(parsedObject);
    }

    set(json, key, value) {
        const parsedObject = JSON.parse(json);
        const parsedParam = key.split('.');
        let tempObject = parsedObject;
        for (let i = 0; i < parsedParam.length - 1; i++) {
            tempObject = tempObject[parsedParam[i]];
        }
        tempObject[parsedParam[parsedParam.length - 1]] = value;
        return JSON.stringify(parsedObject);
    }

    init() {
        ClipCC.API.addCategory({
            categoryId: 'alexcui.json.json',
            messageId: 'alexcui.json.json',
            color: '#FFB11B'
        });
        ClipCC.API.addBlock({
            opcode: 'alexcui.json.get',
            type: ClipCC.Type.BlockType.REPORTER,
            messageId: 'alexcui.json.get', // get key [KEY] from [JSON]
            categoryId: 'alexcui.json.json',
            function: args => this.get(args.JSON, args.KEY),
            argument: {
                KEY: {
                    type: ClipCC.Type.ArgumentType.STRING,
                    default: 'foo'
                },
                JSON: {
                    type: ClipCC.Type.ArgumentType.STRING,
                    default: '{"foo":"bar"}'
                }
            }
        });

        ClipCC.API.addBlock({
            opcode: 'alexcui.json.set',
            type: ClipCC.Type.BlockType.REPORTER,
            messageId: 'alexcui.json.set', // set key [KEY] to [VALUE] in [JSON]
            categoryId: 'alexcui.json.json',
            function: args => this.set(args.JSON, args.KEY, args.VALUE),
            argument: {
                KEY: {
                    type: ClipCC.Type.ArgumentType.STRING,
                    default: 'foo'
                },
                VALUE: {
                    type: ClipCC.Type.ArgumentType.STRING,
                    default: 'baz'
                },
                JSON: {
                    type: ClipCC.Type.ArgumentType.STRING,
                    default: '{"foo":"bar"}'
                }
            }
        })
    }
}

module.exports = JsonExtension;
