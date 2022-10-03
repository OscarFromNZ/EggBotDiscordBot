/**
    * @INFO 
*/

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if (message.author.bot) return;
        if (!message.guild) return;

        // Handler for eggdrops
        await require('../handlers/eggdrop')(client, message);

        // Handler for partnerships
        await require('../handlers/partner')(client, message);
    }
};