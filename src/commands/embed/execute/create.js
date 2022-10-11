/**
    * @INFO Create an embed in a guild
*/

const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, componentType } = require('discord.js');

module.exports = {
    async execute(client, interaction) {
        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId('embedBuilder')
            .setTitle('Embed Builder Interactive Setup');

        // Add components to modal

        // Create the text input components
        const embedColor = new TextInputBuilder()
            .setCustomId('embedColor')
            // The label is the prompt the user sees for this input
            .setLabel("What should the color of the embed be? (hex)")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        const embedTitle = new TextInputBuilder()
            .setCustomId('embedTitle')
            // The label is the prompt the user sees for this input
            .setLabel("What should the title be?")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        const embedDescription = new TextInputBuilder()
            .setCustomId('embedDescription')
            .setLabel("What should the description be?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph);

        const embedImage = new TextInputBuilder()
            .setCustomId('embedImage')
            .setLabel("What should the image be? (link)")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short);

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
            .setStyle(TextInputStyle.Short);


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
                /*
                let emb = new EmbedBuilder()
                    .setColor(interaction.components[0].components[0].value)
                    .setTitle(interaction.components[1].components[0].value)
                    .setDescription(interaction.components[2].components[0].value)
                    .setImage(interaction.components[3].components[0].value)
                    .setThumbnail(interaction.components[4].components[0].value)
                await interaction.reply({ embeds: [emb] });
                */

                /*
                let m = await interaction.editReply(
                    {
                        content: `What would you like to name this embed?`,
                    }
                );

                const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

                collector.on('collect', m => {
                    console.log(`Collected ${m.content}`);
                });
                */
            })
            .catch(console.error);
    }
}