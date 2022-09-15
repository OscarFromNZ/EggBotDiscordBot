const fs = require('fs');

module.exports = async (client) => {
    try {
        // Get event files
        const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith('.js'));
        return eventFiles;

    } catch (e) { console.log(e) }
}
