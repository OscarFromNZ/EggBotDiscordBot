/**
    * @INFO Gets of creates guild with MongoDB using the guild's id
*/

module.exports = async (client, guildId) => {
    // Get the guild doc
    let guildDoc = await client.db.collection("guilds").findOne({
        id: guildId
    });

    // If there is no guild doc, make a guild doc
    if (!guildDoc) {
        let guildDocBase = {
            id: guildId,
        }
        await client.db.collection("guilds").insertOne(guildDocBase, async function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log("✅ Doc made");

            // Set the guild doc again
            guildDoc = await client.db.collection("guilds").findOne({
                id: guildId
            });
        });
    };

    return await guildDoc;
};
