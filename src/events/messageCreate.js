module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        let guild = await client.functions.getOrCreateGuild(client, message.guild.id);
        let member = await client.functions.getOrCreateUserInGuild(client, message.guild.id, message.author.id);
    },
};