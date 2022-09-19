module.exports = async (client, guildId) => {
    // Get the guild doc
    let guildDoc = await client.db.collection("guilds").findOne({
        guild: guildId
    });

    // If there is no guild doc, make a guild doc
    if (!guildDoc) {
        await client.db.collection("guilds").insertOne({guild: guildId}, async function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log("✅ Doc made");

            // Set the guild doc again
            guildDoc = await client.db.collection("guilds").findOne({
                guild: guildId
            });
        });
    };

    return await guildDoc;
};
