/**
    * @INFO Loops through all event files found and registers them to an object ready to be exported 👍
*/

const fs = require('fs');

module.exports = async (client) => {
    try {
        // Get event files
        const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith('.js'));
        return eventFiles;

    } catch (e) { console.log(e) }
}
