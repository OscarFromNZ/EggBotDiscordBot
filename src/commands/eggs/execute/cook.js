/**
    * @INFO Cook up some egg soup!
*/

module.exports = {
    async execute(client, interaction) {
        let userDoc = await client.functions.getOrCreateUser(client, interaction.user.id, async function (userDoc) {
            if (userDoc.eggs < 150) return await interaction.respond(interaction, `${client.emotes.x} Not enough eggs, 150 eggs required, you have ${userDoc.eggs} eggs`);

            let randomNo = Math.floor(Math.random() * 100);
            if (randomNo < 50) {
                userDoc.eggs = userDoc.eggs - randomNo * 2;
                await client.functions.saveUser(client, userDoc);
                return await interaction.respond(interaction, `${client.emotes.warning} Oop, you cracked some of your eggs, you lost ${randomNo * 2} eggs !`);
            }

            userDoc.eggs = userDoc.eggs - 150;
            userDoc.soups === undefined ? userDoc.soups = 1 : userDoc.soups = userDoc.soups + 1;

            await interaction.respond(interaction, `You successfully made an egg soup! ${client.emotes.sparkles}, you have ${userDoc.soups} soups and ${userDoc.eggs} eggs`);

            await client.functions.saveUser(client, userDoc);
        });
    }
}