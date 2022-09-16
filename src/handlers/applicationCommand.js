module.exports = async (client, interaction) => {
    // Search for the command
    const command = await client.commands.get(interaction.commandName);

    // Check permissions


    // Run the command
    await command.execute(client, interaction);
}