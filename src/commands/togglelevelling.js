

module.exports = {
	data: 
    {
        name: "toggleleveling",
        description: "Toggle the leveling system",
        options: [
            {
                name: "on",
                description: "Toggle leveling to on",
                type: 1
            },
            {
                name: "off",
                description: "Toggle leveling to off",
                type: 1
            }
        ]
    },

	async execute(interaction) {
        if (await interaction.getSubcommand()) {

        }
		await interaction.client.db.collection("guilds").updateOne({ _id: interaction.guild.id },
            {
                $set: {
                    levelling: args[0]
                }
            }
        );
	},
};