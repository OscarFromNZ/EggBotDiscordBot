/**
    * @INFO Collect your daily eggs!
*/

module.exports = {
	data: {
        name: "collect",
        description: "Collect your daily eggs!",
        permission: 0, // Member
        isDangerous: false,
    },

    async execute(client, interaction) {
        let userDoc = await client.functions.getOrCreateUser(client, interaction.user.id);
        

        await interaction.respond(interaction, `Latency is ${Date.now() - interaction.createdTimestamp}ms & API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}