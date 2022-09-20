/**
    * @INFO This command removes messages from a user
*/

module.exports = {
	data: {
        name: "removemessages",
        description: "Remove messages from a user",
        permissions: 2, // Admin
        options: [
            {
                name: "user",
                description: "The user to remove the messages from",
                type: 6,
                required: true
            },
            {
                name: "messages",
                description: "The amount of messages to remove from the user",
                type: 10,
                required: true
            }
        ]
    },

    async execute(client, interaction) {
        // Gets the user given, either the option or the user running the command
        let user = await interaction.options.getUser('user');
        
        // Loads the memberDoc from MongoDB (MongoDB is awesome ^-^);
        let memberDoc = await client.functions.getOrCreateUserInGuild(client, interaction.guild.id, user.id);

        // Adds x amount of messages to user
        memberDoc.messages = await memberDoc?.messages - await interaction.options.getNumber('messages');

        // Saves
        await client.functions.saveMember(client, memberDoc);

        // Reply with the amount of messages the target user has
        await interaction.respond(interaction, `Done, <@${user.id}> now has ${memberDoc.messages} messages`);
        
    }
}