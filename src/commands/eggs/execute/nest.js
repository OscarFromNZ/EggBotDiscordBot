/**
    * @INFO This command checks how many eggs a given member has
*/

module.exports = {
    async execute(client, interaction) {
        // Gets the user given, either the option or the user running the command
        let user = await interaction.options.getUser('user') || interaction.user;
        
        // Loads the memberDoc from MongoDB (MongoDB is awesome ^-^);
        // Reply with the amount of messages the target user has
        await client.functions.getOrCreateUser(client, user.id)
        .then(userDoc => (interaction.respond(interaction, `${client.emotes.sparkles} <@${user.id}> currently has ${userDoc.eggs} eggs and ${userDoc.soups ? userDoc.soups : 0} soups!`)));
    }
}