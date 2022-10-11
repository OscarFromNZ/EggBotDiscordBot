/**
    * @INFO Create an embed in a guild
*/

const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, ClientPresence } = require('discord.js');

module.exports = {
    async execute(client, interaction) {
        let guildDoc = await client.functions.getOrCreateGuild(client, interaction.guild.id);

        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId('embedBuilder')
            .setTitle('Embed Builder Interactive Setup')

        // Add components to modal

        // Create the text input components
        const embedColor = new TextInputBuilder()
            .setCustomId('embedColor')
            // The label is the prompt the user sees for this input
            .setLabel("What should the color of the embed be? (hex)")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const embedTitle = new TextInputBuilder()
            .setCustomId('embedTitle')
            // The label is the prompt the user sees for this input
            .setLabel("What should the title be?")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const embedDescription = new TextInputBuilder()
            .setCustomId('embedDescription')
            .setLabel("What should the description be?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false);

        const embedImage = new TextInputBuilder()
            .setCustomId('embedImage')
            .setLabel("What should the image be? (link)")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        /*         
        const embedFooter = new TextInputBuilder()
            .setCustomId('embedFooter')
            .setLabel("What should the footer be?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph); 
        */

        const embedThumbnail = new TextInputBuilder()
            .setCustomId('embedThumbnail')
            .setLabel("What should the thumbnail be? (link)")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short)
            .setRequired(false);


        // An action row only holds one text input,
        // so you need one action row per text input.
        const colorRow = new ActionRowBuilder().addComponents(embedColor);
        const titleRow = new ActionRowBuilder().addComponents(embedTitle);
        const descriptionRow = new ActionRowBuilder().addComponents(embedDescription);
        const imageRow = new ActionRowBuilder().addComponents(embedImage);
        //const footerRow = new ActionRowBuilder().addComponents(embedFooter);
        const thumbnailRow = new ActionRowBuilder().addComponents(embedThumbnail);

        // Add inputs to the modal
        modal.addComponents(colorRow, titleRow, descriptionRow, imageRow, thumbnailRow);

        // Show the modal to the user
        await interaction.showModal(modal);

        const filter = (interaction) => interaction.customId === 'embedBuilder';
        await interaction.awaitModalSubmit({ filter, time: 30_000 })
            .then(async interaction => {

                let emb = new EmbedBuilder()
                    .setColor(interaction.components[0].components[0].value === "" ? undefined : interaction.components[0].components[0].value)
                    .setTitle(interaction.components[1].components[0].value === "" ? undefined : interaction.components[1].components[0].value)
                    .setDescription(interaction.components[2].components[0].value === "" ? undefined : interaction.components[2].components[0].value)
                    .setImage(interaction.components[3].components[0].value === "" ? undefined : interaction.components[3].components[0].value)
                    .setThumbnail(interaction.components[4].components[0].value === "" ? undefined : interaction.components[4].components[0].value);

                await interaction.reply(
                    {
                        content: `Data recorded successfully`,
                    }
                );

                let m = await interaction.followUp(
                    {
                        content: `What would you like to name this embed? (message)`,
                    }
                );

                const collector = await interaction.channel.createMessageCollector({ time: 15000 });

                collector.on('collect', async (m) => {
                    if (m.author.bot) return;
                    if (m.author.id !== interaction.user.id) return;

                    await interaction.followUp(
                        {
                            content: `Sweet! Your embed, "${m.content}", has been saved successfully`,
                            embeds: [ emb ]
                        }
                    );

                    guildDoc.embeds ? guildDoc.embeds[m.content] = emb : guildDoc.embeds = { [m.content]: emb };
                    await client.functions.saveGuild(client, guildDoc);
                });

            })
            .catch(
                console.error
            );
    }
}