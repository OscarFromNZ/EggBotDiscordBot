/**
    * @INFO Collect your daily eggs!
*/

module.exports = {
    async execute(client, interaction) {

        // Stacking two callbacks shruggie
        await client.functions.getOrCreateMember(client, interaction.guild.id, interaction.user.id, async function(memberDoc) {
            await client.functions.getOrCreateUser(client, interaction.user.id, async function(userDoc) {
                console.log('after getting, memberdoc is ' + memberDoc);
        
                if (typeof memberDoc.lastCollectedDate == null || memberDoc.lastCollectedDate < Date.now() - 43200000) {
                    userDoc.eggs = userDoc.eggs === undefined ? 0 : userDoc.eggs + 100;
                    memberDoc.lastCollectedDate = new Date();
                    await client.functions.saveMember(client, memberDoc);
                    await client.functions.saveUser(client, userDoc);
                    await interaction.respond(interaction, `${client.emotes.arrowUp} You have collected your daily 100 eggs successfully!, you know have ${userDoc.eggs} eggs`);
                } else {
                    await interaction.respond(interaction, `${client.emotes.x} **Oh no...** you have already collected your daily eggs for this server :c`);
                }
            });
        });
    }
}