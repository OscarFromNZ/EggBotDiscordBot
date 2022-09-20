/**
    * @INFO This command checks how many messages a given member has
*/

module.exports = {
	data: {
        name: "messages",
        description: "Check the amount of messages a user has",
        permission: 0, // Member
        options: [
            {
                name: "user",
                description: "The user to check the messages of",
                type: 6,
                required: false
            }
        ]
    },

    async execute(client, interaction) {
        // Gets the user given, either the option or the user running the command
        let user = await interaction.options.getUser('user') || interaction.user;
        
        // Loads the memberDoc from MongoDB (MongoDB is awesome ^-^);
        let memberDoc = await client.functions.getOrCreateUserInGuild(client, interaction.guild.id, user.id);

        // Reply with the amount of messages the target user has
        await interaction.respond(interaction, `<@${user.id}> currently has ${memberDoc.messages} in this server`);
    }
}