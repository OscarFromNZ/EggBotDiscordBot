const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('togglelevelling')
		.setDescription('Toggles the levelling system!')

        .addSubcommand(subcommand =>
            subcommand
                .setName('on')
                .setDescription('Turn the leveling system on')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('off')
                .setDescription('Turn the leveling system off')
        ),

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