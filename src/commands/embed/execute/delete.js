/**
    * @INFO Delete an embed in a guild
*/

module.exports = {
    async execute(client, interaction) {
        await interaction.respond(interaction, `Latency is ${Date.now() - interaction.createdTimestamp}ms & API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}