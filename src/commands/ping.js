/**
    * @INFO This is a basic ping command!
*/

module.exports = {
	data: {
        name: "ping",
        description: "Pong!? Check the ping of the bot!",
        permission: 0, // Member
        isDangerous: false,
    },

    async execute(client, interaction) {
        await interaction.respond(interaction, `Latency is ${Date.now() - interaction.createdTimestamp}ms & API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}