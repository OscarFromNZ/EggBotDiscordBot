/**
    * @INFO 
*/

let isSending = false;

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (isSending == true) return;
        let x = Math.floor(Math.random() * 200) + 1;
        if (x == 2) {
            isSending = true;
            setTimeout(async function () {
                await message.channel.send('hello world');
                isSending = false;
            }, 1000)
        }
    }
};