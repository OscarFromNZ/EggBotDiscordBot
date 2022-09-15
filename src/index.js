const {
    Client,
    Intents,
    GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
});

const dotenv = require('dotenv');
dotenv.config();

const startup = require('./startup');
startup(client);

client.once('ready', async (client) => {
    console.log(`✅ ${client.user.tag} is now online!`);
});

client.on('error', async (err) => {
    console.log(err);
})

client.login(process.env.TOKEN);