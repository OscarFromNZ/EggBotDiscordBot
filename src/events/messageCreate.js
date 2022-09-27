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
            let amount = Math.floor(Math.random() * 20) + 1;
            isSending = true;
            setTimeout(async function () {
                let m = await message.channel.send({
                    content: `${client.emotes.shush} Whoa, ${amount} eggs were just dropped in the chat! Collect them quick before anybody else does!`, 
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    type: 2,
                                    label: "Collect the eggs",
                                    style: 1,
                                    custom_id: "click_one"
                                }
                            ]

                        }
                    ] 
                });

                const collector = await m.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });

                let hasCollected = false
                collector.on('collect', async (i) => {
                    if (hasCollected == false) {
                        await client.functions.addOrRemoveEggs(client, amount, i.user);
                        let userDoc = await client.functions.getOrCreateUser(client, i.user.id);
                        await i.reply(`<@${i.user.id}> got the eggs! They now have ${userDoc.eggs} eggs!`)
                        hasCollected = true;
                    } else {
                        await i.reply({ content: `Someone has already collected the eggs :(`, ephemeral: true });
                    }
                });
                isSending = false;
            }, 1000);
        }
    }
};