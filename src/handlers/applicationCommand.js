/**
    * @INFO Handler for all slash commands, this file simply gets the command, checks for permissions, and then executes the command.
    * @TODO Possibly add a ToS accepter + Add better message handling
*/

const { Colors } = require("discord.js");

module.exports = async (client, interaction) => {
    // Search for the command
    const command = await client.commands.get(interaction.commandName);

    // Add vars (should add this to a class)
    interaction.respond = respond;

    // Check permissions

    // Run the command  
    await command.execute(client, interaction);
}   


/**
    * @INFO A simple reply handler for all commands
    * @TODO Put this onto a class for command context or something
*/

let respond = async function(interaction, text) {
    await interaction.reply(
        { 
            content: interaction.client.promomessages[Math.floor(Math.random() * interaction.client.promomessages.length)],
            embeds: [{
                description: text,
                color: interaction.channel.guild.members.me.displayHexColor == '#000000' ? 0x2f3136 : interaction.channel.guild.members.me.displayHexColor
            }]
        }
    );
}