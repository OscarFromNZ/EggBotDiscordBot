module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        //let guild = await client.functions.getOrCreateGuild(client, message.guild.id);

        // Adding one message to the member & saving it
        let memberDoc = await client.functions.getOrCreateUserInGuild(client, message.guild.id, message.author.id);
        memberDoc.messages = await memberDoc?.messages + 1;
        await client.functions.saveMember(client, memberDoc);

        if (memberDoc.messages + 1 == 100) {
            await message.react('🌟');
            // TODO: React with a custom "100" emoji maybe?
        };

        if (memberDoc.messages + 1 == 1000) {
            await message.react('🌟');
        };

        if (memberDoc.messages + 1 == 10000) {
            await message.react('🌟');
        };
    }
};