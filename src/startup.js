/**
    * @INFO This is the basic init function, it defines a few variables (I should really be using more OOP) and registers slash commands at the bottom
*/

var MongoClient = require("mongodb").MongoClient;
let fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Collection } = require('discord.js');
const { Routes } = require('discord-api-types/v9');

module.exports = async (client) => {
    // Storing all functions into client.functions so I can use them easily
    client.functions = await require(`./functions/index`);

    // Storing all event files into the .eventFiles object of client
    client.eventFiles = await client.functions.getEventFiles(client);
    console.log(`Stored eventfiles into client.eventFiles`);

    // Storing mydb into client.db so I can use it easily
    var mongoClient = await MongoClient.connect(process.env.MONGO_URI);
    client.db = await mongoClient.db("eggbot");

    client.emotes = {
        warning: ':warning:',
        chart: ':chart_with_upwards_trend:',
        sparkles: ':sparkles:',
        shush: ':shushing_face:',
        check: ':white_check_mark:',
        info: ':information_source:',
        arrowUp: ':arrow_up:',
        star: ':star:',
        phew: ':face_exhaling:',
        x: ':x:'
    };

    client.promomessages = [

    ];

    try {
        for (const file of client.eventFiles) {
            const event = await require(`../src/events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args));
            }
        }

    } catch (e) { console.log(e) }


    // Command handling

    const commands = [];
    client.commandFiles = new Collection();

    await fs.readdirSync(`./src/commands`).forEach(category => {

        const command = require(`./commands/${category}/commands.json`);
        if (command.name === 'eggs') {
            commands.push(command);
            client.commandFiles.set(command.name, command);
        }

    });

    // Registering the commands in the client
    const rest = new REST({
        version: '9'
    }).setToken(process.env.TOKEN);
    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands('927286445671055370'), {
                body: commands
            },
            );
            console.log('Successfully registered application commands globally');
        } catch (error) {
            if (error) console.error(error);
        }
    })();

}