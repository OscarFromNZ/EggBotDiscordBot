/**
    * @INFO Handler for all slash commands, this file simply gets the command, checks for permissions, and then executes the command.
    * @TODO Possibly add a ToS accepter + Add better message handling
*/

module.exports = async (client, interaction) => {
    // Search for the command
    const command = await client.commands.get(interaction.commandName);

    // Check permissions

    // Run the command  
    await command.execute(client, interaction);
}   