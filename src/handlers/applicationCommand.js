/**
    * @INFO Handler for all slash commands, this file simply gets the command, checks for permissions, and then executes the command.
    * @TODO Possibly add a ToS accepter + Add better message handling
*/

const { PermissionsBitField, ComponentType } = require('discord.js');

module.exports = async (client, interaction) => {
    // Defers the interaction's reply
    await interaction.deferReply();

    // Search for the command
    const command = await client.commands.get(interaction.commandName);

    // Add vars (should add this to a class)
    interaction.respond = respond;

    // Check permissions
    if (command.data.permission == 1 && !interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return await interaction.respond(interaction, 'You are missing the permissions of `MANAGE_SERVER` required to run this'); // Manage Server
    if (command.data.permission == 2 && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.respond(interaction, 'You are missing the permissions of `ADMINISTRATOR` required to run this'); // Admin
    if (command.data.permission == 3 && interaction.user.id !== interaction.guild.ownerId) return await interaction.respond(interaction, 'You are missing the permissions of `SERVER_OWNER` required to run this'); // Owner

    // Run the command
    // Check if command is dangerous, if it is, add a verification
    if (command.data.isDangerous) {
        let message = await interaction.editReply({
            content: `${client.emotes.warning} This command is potientially dangerous, are you sure you want to run it?`,
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            label: "Continue",
                            style: 3,
                            custom_id: "continue"
                        },
                        {
                            type: 2,
                            label: "Cancel",
                            style: 4,
                            custom_id: "cancel"
                        }
                    ]
                },
            ]
        });

        const collector = await message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
        collector.on('collect', async (i) => {
            if (i.user.id === interaction.user.id) {
                await i.deferReply();
                i.respond = respond;
                if (i.customId === 'continue') {
                    await command.execute(client, i);
                } else {
                    await i.respond(i, `${client.emotes.phew} That was a close one~ cancelled interaction`);
                }
                await message.edit({ components: [] });
            } else {
                await i.reply({ content: `${client.emotes.shush} These buttons aren't for you, <@${i.user.id}>`, ephemeral: true});
            }
        });

    } else {
        // If it isn't dangerous, just execute the command
        await command.execute(client, interaction);
    }
}


/**
    * @INFO A simple reply handler for all commands
    * @TODO Put this onto a class for command context or something
*/

let respond = async function (interaction, text) {
    if (interaction.deferred) {
        await interaction.editReply(
            {
                content: interaction.client.promomessages[Math.floor(Math.random() * interaction.client.promomessages.length)],
                embeds: [{
                    description: text,
                    color: interaction.channel.guild.members.me.displayHexColor == '#000000' ? 0x2f3136 : interaction.channel.guild.members.me.displayHexColor
                }],
                components: [],
            }
        );
    }
}