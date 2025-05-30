const fs = require("fs");

class Logger {
    static log(error) {
        const timestamp = new Date().toISOString();
        const message = `[${timestamp}] - ${error}\n`;
        fs.appendFileSync("./logs/log.txt", message);
    }
}

module.exports = Logger;