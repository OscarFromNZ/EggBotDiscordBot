/**
    * @INFO This is command lets the owner clear all saved messages of the server
*/

module.exports = {
	data: {
        name: "resetmessages",
        description: "Dangerous command, reset the messages of everyone in the server",
        permission: 3, // Owner
        isDangerous: true,
    },

    async execute(client, interaction) {
        await interaction.respond(interaction, `Pong`);
    }
}