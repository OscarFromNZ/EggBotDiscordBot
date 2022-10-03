/**
    * @INFO This is a basic ping command!
*/

module.exports = {
    async execute(client, interaction) {
        let guildDoc = await client.functions.getOrCreateGuild(client, interaction.guild.id);
        guildDoc.partnerToggle = await interaction.options.getString('toggle');
        await client.functions.saveGuild(client, guildDoc);

        await interaction.respond(interaction, `Partner msg toggle for this server is now set to ${await interaction.options.getString('toggle')}`);
    }
}