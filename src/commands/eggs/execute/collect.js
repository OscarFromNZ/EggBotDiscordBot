/**
    * @INFO Collect your daily eggs!
*/

module.exports = {
    async execute(client, interaction) {

        // Stacking two callbacks shruggie
        await client.functions.getOrCreateMember(client, interaction.guild.id, interaction.user.id, async function(memberDoc) {
            await client.functions.getOrCreateUser(client, interaction.user.id, async function(userDoc) {
                console.log('after getting, memberdoc is ' + memberDoc);
        
                if (typeof memberDoc.lastCollectedDate == undefined || memberDoc.lastCollectedDate < Date.now() - 43200000) {
                    userDoc.eggs = userDoc.eggs == undefined ? 100 : userDoc.eggs + 100 + userDoc.soups * 10;
                    memberDoc.lastCollectedDate = new Date();
                    await client.functions.saveMember(client, memberDoc);
                    await client.functions.saveUser(client, userDoc);
                    await interaction.respond(interaction, `${client.emotes.arrowUp} You have collected your daily 100 eggs successfully but with a ${userDoc.soups.toString()}0% multiplier because you have ${userDoc.soups.toString()} soups, you now have ${userDoc.eggs.toString()} eggs \n ${client.emotes.chart} 100 eggs with a +${(userDoc.soups * 10).toString()} multiplier`);
                } else {
                    await interaction.respond(interaction, `${client.emotes.x} **Oh no...** you have already collected your daily eggs for this server :c`);
                }
            });
        });
    }
}