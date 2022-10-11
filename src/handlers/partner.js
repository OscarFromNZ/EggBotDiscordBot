/**
    * @INFO Handler for partnerships
    * @TODO I don't like calling MongoDB whenever a message is sent
*/

module.exports = async (client, message) => {
    let channelId = await message.channel.id;
    let guildDoc = await client.functions.getOrCreateGuild(client, message.guild.id);

    if (guildDoc.partnerToggle === "on" || !guildDoc.partnerToggle) {
        if (guildDoc.partnerChannelId === channelId) {
            await message.channel.send('partner yes');
        } else {
            return;
        }
    }
}