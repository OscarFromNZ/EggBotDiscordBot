/**
    * @INFO 
*/
const { ComponentType } = require('discord.js');

let isSending = false;

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if (message.author.bot) return;
        /*
        await client.functions.addOrRemoveEggs(client, -1, message.author, async function (doc) {
            await message.reply(doc.toString());
        });
        */
        if (!message.guild) return;
        if (isSending == true) return;
        let x = Math.floor(Math.random() * 200) + 1;
        if (x) {
            isSending = true;
            setTimeout(async function () {
                let m = await message.channel.send({
                    content: `${client.emotes.shush} Whoa, 16 eggs were just dropped in the chat! Collect them quick before anybody else does!`, 
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    type: 2,
                                    label: "Click me!",
                                    style: 1,
                                    custom_id: "click_one"
                                }
                            ]

                        }
                    ] });

                const collector = await m.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });

                collector.on('collect', async (i) => {
                    if (i.user.id === message.author.id) {
                        await i.reply(`${i.user.id} clicked on the ${i.customId} button.`);
                    } else {
                        await i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
                    }
                });
                isSending = false;
            }, 1000);
        }
    }
};