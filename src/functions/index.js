/**
    * @INFO Gets all functions from this folder and exports them
    * @TODO Make this automatic somehow because it's super annoying
*/

const getEventFiles = require('./getEventFiles');
const getOrCreateGuild = require('./getOrCreateGuild');
const getOrCreateUser = require('./getOrCreateUser');
const saveGuild = require('./saveGuild');
const saveUser = require('./saveUser');

module.exports = {
    getEventFiles: getEventFiles,
    getOrCreateGuild: getOrCreateGuild,
    getOrCreateUser: getOrCreateUser,
    saveGuild: saveGuild,
    saveUser: saveUser
}