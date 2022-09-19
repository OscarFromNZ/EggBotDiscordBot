module.exports = async (client, currentGuildDoc) => {
    await client.db.collection("guilds").replaceOne(
        {
            guild: currentGuildDoc.guild
        },
        currentGuildDoc
    );
    console.log("Doc saved !");
}
