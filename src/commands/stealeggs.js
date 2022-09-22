/**
    * @INFO This command lets a user steal eggs from a user
*/

module.exports = {
	data: {
        name: "stealeggs",
        description: "Steals eggs from a user",
        permission: 2, // Admin
        isDangerous: false,
        options: [
            {
                name: "user",
                description: "The user to remove the messages from",
                type: 6,
                required: true
            },
            {
                name: "risk",
                description: "The amount of messages to remove from the user",
                type: 10,
                required: true
            }
        ]
    },

    async execute(client, interaction) {
        return;
        // Gets the user given, either the option or the user running the command
        let user = await interaction.options.getUser('user');
        
        // Loads the memberDoc from MongoDB (MongoDB is awesome ^-^);
        let userDoc = await client.functions.getOrCreateUser(client, user.id);

        // TODO add math

        let amount;

        // Saves
        await client.functions.saveUser(client, userDoc);

        // Reply with the amount of messages the target user has
        await interaction.respond(interaction, `Hehe, you just stole ${amount} from <@${user.id}>`);
        
    }
}