module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        switch (interaction.type) {
            case 2: { 
                // ApplicationCommand 
                await require("../../src/handlers/applicationCommand")(client, interaction);
                break;
            } case 3: {
                // MessageComponent
                break;
            } case 4: {
                // AutoComplete
                break;
            } case 5: {
                // ModalSubmit
                break;
            } default: {
                // Ping or unknown
                return;
            }
        }
    },
};