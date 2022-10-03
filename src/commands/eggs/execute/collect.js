/**
    * @INFO Collect your daily eggs!
*/

module.exports = {
    async execute(client, interaction) {
        let memberDoc = await client.functions.getOrCreateMember(client, interaction.guild.id, interaction.user.id);
        /*
        console.log(memberDoc);
        console.log(await memberDoc.lastCollectedDate + await memberDoc.lastCollectedDate < Date.now() - 43200000);
        */
        if (typeof memberDoc.lastCollectedDate == null || memberDoc.lastCollectedDate < Date.now() - 43200000) {
            await client.functions.addOrRemoveEggs(client, 100, interaction.user);
            memberDoc.lastCollectedDate = new Date();
            await client.functions.saveMember(client, memberDoc);
            await interaction.respond(interaction, `${client.emotes.arrowUp} You have collected your daily 100 eggs successfully!`)
        } else {
            await interaction.respond(interaction, `${client.emotes.x} You have already collected your daily eggs`);
        }
    }
}