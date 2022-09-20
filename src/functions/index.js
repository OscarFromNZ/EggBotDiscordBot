/**
    * @INFO Gets all functions from this folder and exports them
    * @TODO Make this automatic somehow because it's super annoying
*/

const getEventFiles = require('./getEventFiles');
const getOrCreateGuild = require('./getOrCreateGuild');
const getOrCreateUserInGuild = require('./getOrCreateUserInGuild');
const saveGuild = require('./saveGuild');
const saveMember = require('./saveMember');

module.exports = {
    getEventFiles: getEventFiles,
    getOrCreateGuild: getOrCreateGuild,
    getOrCreateUserInGuild: getOrCreateUserInGuild,
    saveGuild: saveGuild,
    saveMember: saveMember
}