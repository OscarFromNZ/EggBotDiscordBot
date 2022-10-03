/**
    * @INFO This command lets a user give eggs to a user
*/

module.exports = {
    async execute(client, interaction) {
        // Gets the user given, either the option or the user running the command
        let user = await interaction.options.getUser('user');
        
        // Loads the userDoc from MongoDB (MongoDB is awesome ^-^);
        let recieverDoc = await client.functions.getOrCreateUser(client, user.id);
        let giverDoc = await client.functions.getOrCreateUser(client, interaction.user.id);

        let amount = await interaction.options.getNumber('eggs');

        // Check if giver has enough money
        console.log(giverDoc.eggs - amount + " is " + (giverDoc - amount < 0) + ' not as above zero')
        if (giverDoc.eggs - amount < 0) {
            return await interaction.respond(interaction, `${client.emotes.x} You do not have enough eggs to do this!`);
        };

        await client.functions.addOrRemoveEggs(client, amount, interaction.user)

        // Saves
        await client.functions.saveUser(client, recieverDoc);
        await client.functions.saveUser(client, giverDoc);

        // Reply
        await interaction.respond(interaction, `${client.emotes.check} Done, I gave <@${recieverDoc.id}> ${amount} eggs, now has ${recieverDoc.eggs + amount} eggs & <@${giverDoc.id}> now has ${giverDoc.eggs - amount} eggs`);
        
    }
}