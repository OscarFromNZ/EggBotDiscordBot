/**
    * @INFO This is a basic ping command!
*/

module.exports = {
    async execute(client, interaction) {
        let guildDoc = await client.functions.getOrCreateGuild(client, interaction.guild.id);
        let channel = await interaction.options.getChannel('channel');

        if (channel) {
            guildDoc.partnerChannelId = channel.id;

            console.log(guildDoc);
            await client.functions.saveGuild(client, guildDoc);
    
            return await interaction.respond(interaction, `${client.emotes.sparkles} Channel for partnerships has been set to <#${channel.id}>`);

        } else { 
            if (guildDoc.partnerChannelId) {
                return await interaction.respond(interaction, `${client.emotes.arrowUp} The current partnerships channel is <#${guildDoc.partnerChannelId}>`);
            } else {
                return await interaction.respond(interaction, `${client.emotes.x} I could not find any partnerships channel for this server`);
            }
        }
    }
}