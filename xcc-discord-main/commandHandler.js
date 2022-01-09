class command {
    constructor(name, info, parameters) {
        this.name = name;
        this.info = info;
        this.parameters = parameters;
    };
}; 

const test1 = new command("Ping", "Return Pong", null)
const commandList = [test1]



class commandHandler {
    verifyCommandName(name) {
        for (var i = 0; i < commandList.length; i++) {
            if (name === commandList[i].name) return true; 
            else {
                return this.returnCommandList();
            }; 
        }; 
    };


    returnCommandList() {
        const message = {}
        for (var i = 0; i < commandList.length; i++) {
            message[commandList[i].name] = commandList[i].info 
        };
        return message; 
    };
};




const CommandHandler = new commandHandler(); 
console.log(CommandHandler.verifyCommandName("Test4"));