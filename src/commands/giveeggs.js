/**
    * @INFO This command lets a user give eggs to a user
*/

module.exports = {
	data: {
        name: "giveeggs",
        description: "Give eggs to a user",
        permission: 0, // Member
        isDangerous: false,
        options: [
            {
                name: "user",
                description: "The user to give the eggs to",
                type: 6,
                required: true
            },
            {
                name: "eggs",
                description: "The amount of eggs to give to the user",
                type: 10,
                required: true
            }
        ]
    },

    async execute(client, interaction) {
        // Gets the user given, either the option or the user running the command
        let user = await interaction.options.getUser('user');
        
        // Loads the userDoc from MongoDB (MongoDB is awesome ^-^);
        let recieverDoc = await client.functions.getOrCreateUser(client, user.id);
        let giverDoc = await client.functions.getOrCreateUser(client, interaction.user.id);

        let amount = await interaction.options.getNumber('eggs')

        // Check if giver has enough money
        if (giverDoc - amount < 0) {
            return await interaction.respond(interaction, `You do not have enough eggs to do this!`);
        };

        // Adds x amount of eggs to user | Removes x amount of eggs from original user
        recieverDoc.eggs = recieverDoc.eggs + amount;
        giverDoc.eggs = giverDoc.eggs - amount;

        // Saves
        await client.functions.saveUser(client, recieverDoc);
        await client.functions.saveUser(client, giverDoc);

        // Reply
        await interaction.respond(interaction, `Done, <@${recieverDoc.id}> now has ${recieverDoc.eggs + amount} & <@${giverDoc.id}> now has ${giverDoc.eggs - amount}`);
        
    }
}