/**
    * @INFO This command checks how many eggs a given member has
*/

module.exports = {
	data: {
        name: "nest",
        description: "View the nest of yourself or a user",
        permission: 0, // Member
        isDangerous: false,
        options: [
            {
                name: "user",
                description: "The user to check the nest of",
                type: 6,
                required: false
            }
        ]
    },

    async execute(client, interaction) {
        // Gets the user given, either the option or the user running the command
        let user = await interaction.options.getUser('user') || interaction.user;
        
        // Loads the memberDoc from MongoDB (MongoDB is awesome ^-^);
        let userDoc = await client.functions.getOrCreateUser(client, user.id);

        // Reply with the amount of messages the target user has
        await interaction.respond(interaction, `<@${user.id}> currently has ${userDoc.eggs} eggs!`);
    }
}