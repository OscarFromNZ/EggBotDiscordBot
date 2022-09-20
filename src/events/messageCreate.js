/**
    * @INFO Saves the amount of messages a user has to the database whenever a user sends a new message
*/

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        // If the message was sent in a DM // There is no guild found, return
        if (!message.guild) return;

        //let guild = await client.functions.getOrCreateGuild(client, message.guild.id);

        // Adding one message to the member & saving it
        let memberDoc = await client.functions.getOrCreateUserInGuild(client, message.guild.id, message.author.id);
        memberDoc.messages = await memberDoc?.messages + 1;
        await client.functions.saveMember(client, memberDoc);

        if (memberDoc.messages + 1 == 100) {
            await message.react('🌟');
        };

        if (memberDoc.messages + 1 == 1000) {
            await message.react('🌟');
        };

        if (memberDoc.messages + 1 == 10000) {
            await message.react('🌟');
        };
    }
};