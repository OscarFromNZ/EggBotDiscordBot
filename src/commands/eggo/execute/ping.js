/**
    * @INFO This is a basic ping command!
*/

module.exports = {
    async execute(client, interaction) {
        await interaction.respond(interaction, `Latency is ${Date.now() - interaction.createdTimestamp}ms & API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}