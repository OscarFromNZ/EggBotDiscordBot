/**
    * @INFO Handler for partnerships
    * @TODO I don't like calling MongoDB whenever a message is sent
*/

module.exports = async (client, message) => {
    console.log('test');
    let channelId = await message.channel.id;
    console.log('test');
    let guildDoc = await client.functions.getOrCreateGuild(client, message.guild);
    console.log('test');

    if (guildDoc.partnerChannelId === channelId) {
        await message.channel.send('partner yes');
    } else {
        return;
    }
}