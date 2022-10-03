/**
    * @INFO This is a basic ping command!
*/

module.exports = {
    async execute(client, interaction) {
        let channel = await interaction.options.getChannel('channel');
        let guildDoc = client.functions.getOrCreateGuild(client, interaction.guild.id);

        guildDoc.partnerChannelId = channel.id;

        await client.functions.saveGuild(client, guildDoc);

        await interaction.respond(interaction, `${client.emotes.sparkles} Channel for partnerships has been set to <#${channel.id}>`);
    }
}