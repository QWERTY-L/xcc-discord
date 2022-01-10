class createCommand {
    constructor(name, info, parameters) {
        this.name = name;
        this.info = info;
        this.parameters = parameters;
    };
}; 

class commandHandler {
    constructor(commandList) {
        this.commandList = commandList;
    }

    verifyCommandName(name) {
        for (var i = 0; i < this.commandList.length; i++) {
            if (name === this.commandList[i].name) return true; 
        }; 
        return false;
    };


    returnCommandList() {
        var message = "```\nCommand List:"
        for (var i = 0; i < this.commandList.length; i++) {
            message = message.concat("\n", "Name: ", this.commandList[i].name, " Description: ", this.commandList[i].info)
        };
        return message + "\n```"; 
    };
};

module.exports = {createCommand, commandHandler};
